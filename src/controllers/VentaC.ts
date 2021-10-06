import { Request, Response } from 'express';
import { prisma } from '../Services/Services';
import { v4 as uuidv4, v4 } from 'uuid';

class VentaC {

  private readonly fecha: Date;

  constructor() {
    this.fecha = new Date(new Date().toUTCString());
  }

  public async makeVenta(req: Request, res: Response): Promise<Response> {
    console.info(req.body)
    const { sedeDireccion, fraccion, adminEmail, clienteEmail, productos, pago } = req.body;
    let mensaje = 'Pagado';
    let precio_lista = 0;
    let precio_lista_acumulado = 0;
    let precio_lista_total = 0;
    let lista = [];
    const pago_total = pago[0].monto + pago[1].monto;

    for (let i = 0; i < productos.length; i++) {
      const { nombre, cantidad } = productos[i];
      const one = await this.findOne(nombre)

      if (typeof(one?.precio_producto[0].precio.costo) !== 'undefined' ||
      typeof(one?.precio_producto[0].precio.valor_agregado) !== 'undefined') {

        const notDescuento: boolean = one.descuento_producto.length === 0;
        const notIva: boolean = one.iva_producto.length === 0;
        const valPre = one.precio_producto[0].precio.costo + one.precio_producto[0].precio.valor_agregado;
        let valPor: number;
        let des: number;
        if (notDescuento) {
          valPor = 0;
          des = 0;
        } else {
          valPor = one.descuento_producto[0].descuento.porcentaje;
          des = (100 - valPor) * 0.01;
        }
        const valIva = (notIva) ? 0 : one.iva_producto[0].iva.porcentaje;
        const iva = valIva * 0.01 + 1;

        precio_lista += valPre;
        precio_lista_acumulado += valPre * cantidad;
        precio_lista_total += valPre * cantidad * des * iva;

        const venta_individual = {
          nombre,
          cantidad,
          precio: valPre,
          precio_acumulado: valPre * cantidad,
          precio_total: valPre * cantidad * des * iva
        }
        lista.push(venta_individual);
      }
    }

    if (precio_lista > pago_total) {
      mensaje = 'Saldo insuficiente';
      return res.status(200).json({mensaje, precio_lista, precio_lista_acumulado, precio_lista_total, lista});
    }

    const facutura_id = await prisma.factura.create({
      select: {
        factura_id: true
      },
      data: {
        sede: {
          connect: {
            direccion: sedeDireccion
          },
        },
        usuario: {
          connect: {
            correo: clienteEmail
          }
        }
      }
    });

    const ventas = async (nombre: string, cantidad: number) => await prisma.producto_ventas.create({
      data: {
        producto: {
          connect: {
            nombre: nombre
          }
        },
        ventas: cantidad
      }
    })

    const factura_producto = async (nombre: string, cantidad: number) => await prisma.factura_producto.create({
      data: {
        factura: {
          connect: {
            factura_id: facutura_id.factura_id
          }
        },
        producto: {
          connect: {
            nombre: nombre
          }
        },
        cantidad: cantidad
      }
    })

    const transaccion = async () => await prisma.transaccion.create({
      data: {
        usuario: {
          connect: {
            correo: adminEmail
          }
        },
        factura: {
          connect: {
            factura_id: facutura_id.factura_id
          }
        }
      }
    })

    await transaccion();

    for (let i = 0; i < productos.length; i++) {
      const { nombre, cantidad } = productos[i];
      await Promise.all([ventas(nombre, cantidad), factura_producto(nombre, cantidad)])
    }

    let entidad_bancaria = '';
    const metodoDePago1 = pago[0].metodoDePago;
    const numeroTarjeta1 = pago[0].numeroTarjeta;
    const monto1 = pago[0].monto;
    const realizar_pago = async (metodoDePago: string, numeroTarjeta: string, monto: number) => {
      if (metodoDePago === 'efectivo') {
        await prisma.pago_efectivo.create({
          data: {
            factura: {
              connect: {
                factura_id: facutura_id.factura_id
              }
            },
            pago: precio_lista_total
          }
        })
      } else {
        const year = numeroTarjeta.substring(0,4);
        if (parseInt(year) < 3300) {
          entidad_bancaria = 'VISA'
        } else if (parseInt(year) < 6600) {
          entidad_bancaria = 'MASTERCARD'
        } else {
          entidad_bancaria = 'AMERICAN EXPRESS'
        }
        await prisma.pago_tarjeta.create({
          data: {
            factura: {
              connect: {
                factura_id: facutura_id.factura_id
              }
            },
            tipo_tarjeta: {
              connect: {
                nombre: metodoDePago
              }
            },
            tarjeta_id: numeroTarjeta,
            aprobacion_id: uuidv4(),
            aprobacion_entidad: entidad_bancaria,
            pago: monto
          }
        })
      }
    }

    if (fraccion) {
      const metodoDePago2 = pago[1].metodoDePago;
      const numeroTarjeta2 = pago[1].numeroTarjeta;
      const monto2 = pago[1].monto;

      if (metodoDePago1 === 'efectivo') {
        await Promise.all([realizar_pago(metodoDePago1, numeroTarjeta1, monto1), realizar_pago(metodoDePago2, numeroTarjeta2, monto2)]);
        const pago1 = 'efectivo';
        const pagos = {
          pago1,
          entidad_bancaria
        }
        return res.status(200).json({pagos, mensaje, precio_lista, precio_lista_acumulado, precio_lista_total, lista});
      } else if (metodoDePago2 === 'efectivo') {
        await Promise.all([realizar_pago(metodoDePago1, numeroTarjeta1, monto1), realizar_pago(metodoDePago2, numeroTarjeta2, monto2)]);
        const pago2 = 'efectivo';
        const pagos = {
          entidad_bancaria,
          pago2
        }
        return res.status(200).json({pagos, mensaje, precio_lista, precio_lista_acumulado, precio_lista_total, lista});
      } else {
        await realizar_pago(metodoDePago1, numeroTarjeta1, precio_lista_total);
        const entidades_bancarias = {
          entidad_bancaria1: entidad_bancaria,
          entidad_bancaria2: entidad_bancaria
        }
        await realizar_pago(metodoDePago2, numeroTarjeta2, precio_lista_total);
        entidades_bancarias["entidad_bancaria2"] = entidad_bancaria;
        return res.status(200).json({entidades_bancarias, mensaje, precio_lista, precio_lista_acumulado, precio_lista_total, lista});
      }

    } else {
      realizar_pago(metodoDePago1, numeroTarjeta1, precio_lista_total);
      if (metodoDePago1 === 'efectivo') {
        const pago = 'efectivo';
        return res.status(200).json({pago, mensaje, precio_lista, precio_lista_acumulado, precio_lista_total, lista});
      } else {
        return res.status(200).json({entidad_bancaria, mensaje, precio_lista, precio_lista_acumulado, precio_lista_total, lista});
      }
    }
  }

  private async findOne(name: string) {
    return await prisma.producto.findUnique({
      where: {
        nombre: name
      },
      select: {
        nombre: true,
        numero: true,
        imagen: true,
        codigo: true,
        categoria: {
          select: {
            nombre: true
          }
        },
        descripcion: true,
        precio_producto: {
          select: {
            precio: {
              select: {
                costo: true,
                valor_agregado: true
              },
            }
          },
          orderBy: {
            precio_id: 'desc'
          },
          distinct: ['producto_id']
        },
        descuento_producto: {
          where: {
            descuento: {
              AND: [
                {
                  fecha_inicial: {
                    lte: this.fecha
                  },
                  fecha_final: {
                    gte: this.fecha
                  }
                }
              ]
            }
          },
          select: {
            descuento: {
              select: {
                porcentaje: true
              }
            }
          }
        },
        iva_producto: {
          select: {
            iva: true
          },
          orderBy: {
            iva_id: 'desc'
          }
        },
        producto_disponibilidad: {
          select: {
            stock: true
          }
        },
        producto_ventas: {
          select: {
            ventas: true
          }
        }
      }
    });
  }

}

const ventaC = new VentaC();
export default ventaC;