import { Request, Response } from 'express';
import { prisma } from '../Services/Services';
import { Prisma } from '@prisma/client';

class ProductoC {

  private readonly fecha: Date;

  constructor() {
    this.fecha = new Date(new Date().toUTCString());
  }

  public async getMany(req: Request, res: Response): Promise<Response> {
    console.log(`\n****Get Many Producto****\n`)
    try {
      console.log(req.query);
      const categoria = req.query.categoria;
      if (categoria !== undefined) {
        let data: any = [];
        const many = await prisma.producto.findMany({
          where: {
            categoria: {
              nombre: `${categoria}`
            },
            habilitado: true
          },
          select: {
            nombre: true,
            imagen: true,
            descripcion: true,
            producto_disponibilidad: {
              select: {
                stock: true
              },
              orderBy: {
                tiempo: 'desc'
              },
              distinct: ['producto_id']
            },
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
            }
          }
        });
        for (let i = 0; i < many.length; i++) {
          const costo = many[i].precio_producto[0].precio.costo;
          const ganancia = many[i].precio_producto[0].precio.valor_agregado;
          const precio = costo + ganancia;
          const stock = many[i].producto_disponibilidad[0].stock > 0;
          data.push({
            nombre: many[i].nombre,
            imagen: many[i].imagen,
            descripcion: many[i].descripcion,
            stock: stock,
            precio: precio
          });
        };
        // Logs
        for (let i = 0; i < data.length; i++) {
          console.log(data[i].nombre);
        }
        return res.status(200).json(data);
      } else {
        return res.status(500).send('Solicitud incorrecta')
      }
    } catch (e) {
      console.log(e);
      return res.status(500);
    }
  }

  public async getOne(req: Request, res: Response): Promise<Response> {
    console.log(`\n****Get One Producto****\n`)
    try {
      console.log(req.query);
      const producto = req.query.producto;
      if (producto !== undefined) {
        let error = false;
        let dataToSend = null;
        let disponibilidad = 0;
        let ventas = 0;
        const unique = await prisma.producto.findUnique({
          where: {
            nombre: `${producto}`
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
                        lte: productoC.fecha
                      },
                      fecha_final: {
                        gte: productoC.fecha
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

        const detalle = async (prod: string, det: string) =>
        await prisma.detalle_producto.findMany({
          where: {
            producto: {
              nombre: prod
            },
            detalle: {
              detalle_tipo: {
                nombre: det
              }
            }
          },
          select: {
            detalle: {
              select: {
                nombre: true
              }
            }
          }
        });

        const getDetalles = async (prod: string, det: string) => {
          const array = await detalle(prod, det);
          let newArray: any = [];
          for (let i = 0; i < array.length; i++) {
            newArray.push(array[i].detalle.nombre);
          }
          return newArray;
        }

        const descuentos = await prisma.descuento_producto.findMany({
          where: {
            producto: {
              nombre: `${producto}`
            },
            descuento: {
              fecha_final: {
                gte: productoC.fecha
              }
            }
          },
          select: {
            descuento: {
              select: {
                fecha_inicial: true,
                fecha_final: true,
                porcentaje: true
              }
            }
          }
        })
        let descuentosArray: any[] = [];
        for (let i = 0; i < descuentos.length; i++) {
          const fechaInicialSinFormato = `${descuentos[i].descuento.fecha_inicial.getUTCFullYear()}-${("0" + (descuentos[i].descuento.fecha_inicial.getUTCMonth() + 1)).slice(-2)}-${("0" + descuentos[i].descuento.fecha_inicial.getUTCDate()).slice(-2)}`;
          const fechaFInalSinFormato = `${descuentos[i].descuento.fecha_final.getUTCFullYear()}-${("0" + (descuentos[i].descuento.fecha_final.getUTCMonth() + 1)).slice(-2)}-${("0" + descuentos[i].descuento.fecha_final.getUTCDate()).slice(-2)}`;
          const descuento = {
            fecha_inicial: fechaInicialSinFormato,
            fecha_final: fechaFInalSinFormato,
            porcentaje: descuentos[i].descuento.porcentaje
          }
          descuentosArray.push(descuento)
        }

        if (typeof(unique?.producto_disponibilidad) !== 'undefined') {
          for (const disp of unique.producto_disponibilidad) {
            disponibilidad += disp.stock;
          }
        }

        if (typeof(unique?.producto_ventas) !== 'undefined') {
          for (const disp of unique.producto_ventas) {
            ventas += disp.ventas;
          }
        }

        if (typeof(unique?.precio_producto[0].precio.costo) !== 'undefined' ||
        typeof(unique?.precio_producto[0].precio.valor_agregado) !== 'undefined') {

          const notDescuento: boolean = unique.descuento_producto.length === 0;
          const notIva: boolean = unique.iva_producto.length === 0;
          const valPre = unique.precio_producto[0].precio.costo +
          unique.precio_producto[0].precio.valor_agregado;
          let valPor: number | null;
          let preConDes: number | null;
          if (notDescuento) {
            valPor = null;
            preConDes = null;
          } else {
            valPor = unique.descuento_producto[0].descuento.porcentaje;
            preConDes = valPre * (100 - valPor) * 0.01;
          }
          const valIva = (notIva) ? null : unique.iva_producto[0].iva.porcentaje;

          dataToSend = {
            nombre: unique?.nombre,
            uuid: unique?.numero,
            codigo: unique?.codigo,
            categoria: unique?.categoria.nombre,
            imagen: unique?.imagen,
            descripcion: unique?.descripcion,
            costo: unique.precio_producto[0].precio.costo,
            ganancia: unique.precio_producto[0].precio.valor_agregado,
            precio: valPre,
            porcentaje: valPor,
            precio_con_descuento: preConDes,
            iva: valIva,
            stock: disponibilidad - ventas,
            ingredientes: await getDetalles(`${producto}`,'Ingredientes'),
            acompañamientos: await getDetalles(`${producto}`,'Acompañamientos'),
            tiempo: await getDetalles(`${producto}`,'Tiempo de preparación'),
            otros: await getDetalles(`${producto}`,'Caracteristicas importantes'),
            descuentos: descuentosArray
          }

        } else {
          error = true;
        }
        // Logs
        console.log(productoC.fecha);
        console.log(producto);
        console.log(dataToSend)
        if (!error) {
          return res.status(200).json(dataToSend);
        } else {
          return res.status(200).send('Producto no encontrado');
        }
      } else {
        return res.status(500).send('Solicitud incorrecta')
      }
    } catch (e) {
      console.log(e);
      return res.status(500);
    }
  }

  public async create(req: Request, res: Response): Promise<Response> {
    console.log(`\n****Post Producto Create****\n`);
    let data = {};
    let status = 201;
    const addproducto = await productoC.generateProducto(res, req);
    const create = await prisma.producto.create({
      data: addproducto
    }).catch(err => {
      console.log(err);
      status = 500;
      if (err.code === 'P2002') {
        status = 400;
        const yaExiste = 'ya existe';
        switch (err.meta.target[0]) {
          case 'nombre':
            data = { productName: yaExiste };
            break;
          case 'codigo':
            data = { codigo: yaExiste };
            break;
          case 'imagen':
            data = { urlimg: yaExiste };
            break;
          case 'descripcion':
            data = { descripcionProduct: yaExiste };
            break;
          default:
            break;
        }
      } else if (err.code === 'P2025') {
        data = { error: 'El producto contiene dependencias que no han sido creadas' }
      }
    })
    if (create) {
      console.log('Se ha creado el producto!!!\n')
      return res.status(status).json('Acción realizada con exito');
    } else {
      console.log('No se creó el producto')
      return res.status(status).json(data);
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    console.log(`\n****Update Producto****\n`);
    let data = {};
    let status = 201;
    const findProducto = await prisma.producto.findUnique({
      where: {
        numero: req.body.uuid
      },
      select: {
        codigo: true
      }
    })
    let successfulUpdate = false;
    if (findProducto) {
      successfulUpdate = true;
      const addproducto = await productoC.generateUpdateProducto(res, req);
      await prisma.producto.update({
        where: {
          numero: req.body.uuid
        },
        data: addproducto
      }).catch(err => {
        successfulUpdate = false;
        status = 400;
        console.log(err);
        if (err.code === 'P2002') {
          const yaExiste = 'ya existe';
          switch (err.meta.target[0]) {
            case 'nombre':
              data = { productName: yaExiste };
              break;
            case 'codigo':
              data = { codigo: yaExiste };
              break;
            case 'imagen':
              data = { urlimg: yaExiste };
              break;
            case 'descripcion':
              data = { descripcionProduct: yaExiste };
              break;
            default:
              break;
          }
        }
      })
    } else {
      console.log('No se encuentra ningún producto con el codigo UUID que se ha provisto')
    }
    if (successfulUpdate) {
      console.log('Se ha actulizado el producto!!!\n')
      return res.status(status).json(data);
    } else {
      console.log('No se actualizó el producto')
      return res.status(status).json(data);
    }
  }

  public async desactivate(req: Request, res: Response): Promise<Response> {
    console.log(`\n****Delete Producto Desactivate****\n`);
    console.log(req.params);
    prisma.producto.update({
      where: {
        nombre: req.params.id
      },
      data: {
        habilitado: false
      }
    }).catch((err) => {
      console.log(err);
      return res.status(500).json('Algo salió mal')
    });
    console.log('Borrado')
    return res.status(200).json('Borrado');
  }

  private async generateUpdateProducto(res: Response, req: any) {
    const productoNumeroUUID = {
      producto: {
        numero: req.body.uuid
      }
    }
    const everyProduct = {
      every: productoNumeroUUID
    }

    await prisma.detalle_producto.deleteMany({
      where: productoNumeroUUID
    }).catch(err => console.log(err));

    await prisma.detalle.deleteMany({
      where: {
        detalle_producto: everyProduct
      }
    });

    await prisma.descuento_producto.deleteMany({
      where: {
        producto: productoNumeroUUID.producto,
        descuento: {
          fecha_final: {
            gte: this.fecha
          }
        }
      }
    })

    await prisma.descuento.deleteMany({
      where: {
        descuento_producto: everyProduct,
        fecha_final: {
          gte: this.fecha
        }
      }
    })

    const findIdPrecio = await prisma.precio.findUnique({
      where: {
        precio_fecha_costo_valor_agregado_key: {
          fecha: this.fecha,
          costo: parseInt(req.body.costoProduccion),
          valor_agregado: parseInt(req.body.ganancia)
        }
      },
      select: {
        precio_id: true
      }
    })

    const findIdIva = await prisma.iva.findUnique({
      where: {
        iva_fecha_porcentaje_key: {
          fecha: this.fecha,
          porcentaje: parseInt(req.body.iva)
        }
      },
      select: {
        iva_id: true
      }
    })

    const detalles = await productoC.getDet(res, req.body.ingredientes, req.body.acompanamientos, req.body.caracteristicas, req.body.tiempo);

    const descuentos = await productoC.getDes(res, req.body.descuentos);

    const precioIsTheSame = async () => {
      const rslt = await prisma.precio_producto.findMany({
        where: productoNumeroUUID,
        select: {
          precio: {
            select: {
              costo: true,
              valor_agregado: true,
              fecha: true
            },
          }
        },
        orderBy: {
          precio_id: 'desc'
        },
        distinct: ['producto_id'] // rslt es undefined. ¿qué se hace?
      });
      let costo = true;
      let ganancia = true;
      if (rslt.length > 0) {
        costo = rslt[0].precio.costo == req.body.costoProduccion;
        ganancia = rslt[0].precio.valor_agregado == req.body.ganancia;
        console.log(`\n Revisando si el precio cambió desde la ultima vez\n`)
        const sameYear = rslt[0].precio.fecha.getUTCFullYear() === this.fecha.getFullYear();
        const sameMonth = rslt[0].precio.fecha.getUTCMonth() === this.fecha.getMonth();
        const sameDate = rslt[0].precio.fecha.getUTCDate() === this.fecha.getDate();
        if (sameDate && sameMonth && sameYear) {
          console.log('Las fecha no ha cambiado.\nBorrando antiguo precio...')
          let innerError = false;
          await prisma.precio_producto.deleteMany({
            where: {
              producto: productoNumeroUUID.producto,
              precio: {
                costo: rslt[0].precio.costo,
                valor_agregado: rslt[0].precio.valor_agregado,
                fecha: rslt[0].precio.fecha
              }
            }
          }).catch(err => {
            innerError = true;
            console.log('Error en precioIsTheSame -> precio_producto.deleteMany')
            console.log(err);
          })
          await prisma.precio.deleteMany({
            where: {
              precio_producto: everyProduct,
              costo: rslt[0].precio.costo,
              valor_agregado: rslt[0].precio.valor_agregado,
              fecha: rslt[0].precio.fecha
            }
          }).catch(err => {
            innerError = true;
            console.log('Error en precioIsTheSame -> precio.deleteMany')
            console.log(err);
          })
          if (!innerError) {
            console.log('Antiguo precio borrado con exito!')
          }
        } else {
          console.log('La fecha ha cambiado. No se borrará el antiguo precio.\n')
        }
      } else {
        console.log(`No se han encontrado relaciones de precio_producto con ${req.body.nombre}`)
      }
      return costo && ganancia;
    }

    const ivaIsTheSame = async () => {
      const rslt = await prisma.iva_producto.findMany({
        where: productoNumeroUUID,
        select: {
          iva: {
            select: {
              porcentaje: true,
              fecha: true
            },
          }
        },
        orderBy: {
          iva_id: 'desc'
        },
        distinct: ['producto_id']
      });
      let porcentaje = true;
      if (rslt.length > 0) {
        porcentaje = rslt[0].iva.porcentaje == req.body.iva;
        console.log(`\n Revisando si el iva cambió desde la ultima vez\n`)
        const sameYear = rslt[0].iva.fecha.getUTCFullYear() === this.fecha.getFullYear();
        const sameMonth = rslt[0].iva.fecha.getUTCMonth() === this.fecha.getMonth();
        const sameDate = rslt[0].iva.fecha.getUTCDate() === this.fecha.getDate();
        if (sameDate && sameMonth && sameYear) {
          console.log('La fecha no ha cambiado.\nBorrando antiguo iva...')
          let innerError = false;
          await prisma.iva_producto.deleteMany({
            where: {
              producto: productoNumeroUUID.producto,
              iva: {
                porcentaje: rslt[0].iva.porcentaje,
                fecha: rslt[0].iva.fecha
              }
            }
          }).catch(err => {
            innerError = true;
            console.log('Error en ivaIsTheSame -> iva_producto.deleteMany')
            console.log(err);
          })
          await prisma.iva.deleteMany({
            where: {
              iva_producto: everyProduct,
              porcentaje: rslt[0].iva.porcentaje,
                fecha: rslt[0].iva.fecha
            }
          }).catch(err => {
            innerError = true;
            console.log('Error en ivaIsTheSame -> iva.deleteMany')
            console.log(err);
          })
          if (!innerError) {
            console.log('El iva se cambió con exito!');
          }
        } else {
          console.log('La fecha ha cambiado. No se borrará el antiguo iva.\n')
        }
      } else {
        console.log(`No se han encontrado relaciones de precio_producto con ${req.body.nombre}`)
      }
      return porcentaje;
    }

    const addproducto: Prisma.productoUpdateInput = {
      nombre: req.body.productName,
      categoria: {
        connect: {
          nombre: req.body.categoria
        }
      },
      codigo: req.body.codigo,
      descripcion: req.body.descripcionProduct,
      imagen: req.body.urlimg,
      detalle_producto: {
        createMany: {
          data: detalles,
          skipDuplicates: true
        }
      },
      descuento_producto: {
        createMany: {
          data: descuentos,
          skipDuplicates: true
        }
      },
      producto_disponibilidad: {
        create: {
          stock: parseInt(req.body.stock)
        }
      }
    }

    if (!(findIdPrecio || await precioIsTheSame())) {
      console.log(`Actualizando precio\n`)
      addproducto["precio_producto"] = {
        create: {
          precio: {
            connectOrCreate: {
              where: {
                precio_fecha_costo_valor_agregado_key: {
                  fecha: this.fecha,
                  costo: parseInt(req.body.costoProduccion),
                  valor_agregado: parseInt(req.body.ganancia)
                }
              },
              create: {
                fecha: this.fecha,
                costo: parseInt(req.body.costoProduccion),
                valor_agregado: parseInt(req.body.ganancia)
              }
            }
          }
        }
      }
    }

    if (!(findIdIva || await ivaIsTheSame())) {
      console.log(`Actualizado iva\n`)
      addproducto["iva_producto"] = {
        create: {
          iva: {
            connectOrCreate: {
              where: {
                iva_fecha_porcentaje_key: {
                  fecha: this.fecha,
                  porcentaje: parseInt(req.body.iva)
                }
              },
              create: {
                fecha: this.fecha,
                porcentaje: parseInt(req.body.iva)
              }
            }
          }
        }
      }
    }

    return addproducto;
  }

  private async generateProducto(res: Response, req: any) {
    const detalles = await productoC.getDet(res, req.body.ingredientes,
       req.body.acompanamientos, req.body.caracteristicas, req.body.tiempo);

    const addproducto: Prisma.productoCreateInput = {
      nombre: req.body.productName,
      categoria: {
        connect: {
          nombre: req.body.categoria
        }
      },
      codigo: req.body.codigo,
      descripcion: req.body.descripcionProduct,
      imagen: req.body.urlimg,
      precio_producto: {
        create: {
          precio: {
            connectOrCreate: {
              where: {
                precio_fecha_costo_valor_agregado_key: {
                  fecha: this.fecha,
                  costo: parseInt(req.body.costoProduccion),
                  valor_agregado: parseInt(req.body.ganancia)
                }
              },
              create: {
                fecha: this.fecha,
                costo: parseInt(req.body.costoProduccion),
                valor_agregado: parseInt(req.body.ganancia)
              }
            }
          }
        }
      },
      detalle_producto: {
        createMany: {
          data: detalles
        }
      },
      producto_disponibilidad: {
        create: {
          stock: parseInt(req.body.stock)
        }
      }
    }

    if (req.body.descuento !== "") {
      addproducto["descuento_producto"] = {
        create: {
          descuento: {
            connectOrCreate: {
              where: {
                descuento_fecha_inicial_fecha_final_porcentaje_key: {
                  fecha_inicial: new Date(req.body.fecha_inicial),
                  fecha_final: new Date(req.body.fecha_final),
                  porcentaje: parseInt(req.body.descuento)
                }
              },
              create: {
                fecha_inicial: new Date(req.body.fecha_inicial),
                fecha_final: new Date(req.body.fecha_final),
                porcentaje: parseInt(req.body.descuento)
              }
            }
          }
        }
      }
    }

    if (req.body.iva !== "") {
      addproducto["iva_producto"] = {
        create: {
          iva: {
            connectOrCreate: {
              where: {
                iva_fecha_porcentaje_key: {
                  fecha: this.fecha,
                  porcentaje: parseInt(req.body.iva)
                }
              },
              create: {
                fecha: this.fecha,
                porcentaje: parseInt(req.body.iva)
              }
            }
          }
        }
      }
    }

    return addproducto;
  }

  private async getDes(res: Response, descuento: Array<any>) {
    const descuentos: any[] = [];

    const addDes = async (des: any) => {
      const id = await prisma.descuento.findUnique({
        where: {
          descuento_fecha_inicial_fecha_final_porcentaje_key: {
            fecha_inicial: new Date(des.fecha_inicial),
            fecha_final: new Date(des.fecha_final),
            porcentaje: parseInt(des.porcentaje)
          }
        },
        select: {
          descuento_id: true
        }
      }).catch(err => {
        console.log(err);
      })
      if (id) {
        descuentos.push(id)
      } else {
        console.log(`Creando descuento del ${des.porcentaje}%`)
        const creado = await prisma.descuento.create({
          data: {
            fecha_inicial: new Date(des.fecha_inicial),
            fecha_final: new Date(des.fecha_final),
            porcentaje: parseInt(des.porcentaje)
          },
          select: {
            descuento_id: true
          }
        }).catch((err) => {
          console.log(err);
          return res.status(500).send('Algo salió mal');
        });
        if (creado) {
          descuentos.push(creado)
        }
      }
    }

    for (const e of descuento) {
      await addDes(e);
    }

    return descuentos;
  }

  private async getDet(res: Response, ing: Array<any>, aco: Array<any>, car: Array<any>, tie: any) {
    const detalles: any[] = [];

    const addDet = async (det: string, filter: string) => {

      const id = await prisma.detalle.findUnique({
        where: {
          nombre: det
        },
        select: {
          detalle_id: true
        }
      }).catch(err => {
        console.log(err);
      })
      if (id) {
        detalles.push(id)
      } else {
        console.log(`${filter} no existe, se va a crear`)
        console.log(det)
        const creado = await prisma.detalle.create({
          data: {
            nombre: det,
            detalle_tipo: {
              connect: {
                nombre: filter
              }
            }
          },
          select: {
            detalle_id: true
          }
        }).catch((err) => {
          console.log(err);
          return res.status(500).send('Algo salió mal');
        });
        if (creado) {
          detalles.push(creado)
        }
      }
    }

    for (const e of ing) {
      await addDet(e,'Ingredientes');
    }

    for (const e of aco) {
      await addDet(e,'Acompañamientos');
    }

    for (const e of car) {
      await addDet(e,'Caracteristicas importantes');
    }

    await addDet(tie, 'Tiempo de preparación');

    return detalles;
  }

}

const productoC = new ProductoC();
export default productoC;