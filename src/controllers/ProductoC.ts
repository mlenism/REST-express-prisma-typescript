import { Request, Response } from 'express';
import { prisma } from '../Services/Services';

class ProductoC {

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
            }
          },
          select: {
            nombre: true,
            imagen: true,
            descripcion: true,
            producto_disponibilidad_final: {
              select: {
                stock_final: true
              },
              orderBy: {
                tiempo: 'desc'
              },
              distinct: ['producto_id']
            }
          }
        });
        many.forEach(element => {
          const stock = element.producto_disponibilidad_final[0].stock_final > 0;
          data.push({
            nombre: element.nombre,
            imagen: element.imagen,
            descripcion: element.descripcion,
            stock: stock
          });
        });
        // Logs
        data.forEach((element: { nombre: string; }) => {
          console.log(element.nombre)
        });
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
        let one = null;
        const fecha1 = new Date();
        const fecha2 = new Date();
        fecha2.setDate(fecha1.getUTCDate() + 1)
        const unique = await prisma.producto.findUnique({
          where: {
            nombre: `${producto}`
          },
          select: {
            imagen: true,
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
                        gte: new Date(fecha1.toUTCString())
                      },
                      fecha_final: {
                        lte: new Date(fecha2.toUTCString())
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
          array.forEach(element => {
            newArray.push(element.detalle.nombre);
          });
          return newArray;
        }

        if (typeof(unique?.precio_producto[0].precio.costo) !== 'undefined' ||
          typeof(unique?.precio_producto[0].precio.valor_agregado) !== 'undefined') {

          const valor = unique.precio_producto[0].precio.costo +
            unique.precio_producto[0].precio.valor_agregado;

          if (unique.descuento_producto.length === 0) {
            one = {
              imagen: unique?.imagen,
              descripcion: unique?.descripcion,
              precio: valor,
              porcentaje: null,
              precio_con_descuento: null,
              ingredientes: await getDetalles(`${producto}`,'Ingredientes'),
              acompañamientos: await getDetalles(`${producto}`,'Acompañamientos'),
              tiempo: await getDetalles(`${producto}`,'Tiempo de preparación'),
              otros: await getDetalles(`${producto}`,'Caracteristicas importantes')
            }
          } else {
            const porcent = unique.descuento_producto[0].descuento.porcentaje;
            one = {
              imagen: unique?.imagen,
              descripcion: unique?.descripcion,
              precio: valor,
              porcentaje: porcent,
              precio_con_descuento: valor * (100 - porcent) * 0.01,
              ingredientes: await getDetalles(`${producto}`,'Ingredientes'),
              acompañamientos: await getDetalles(`${producto}`,'Acompañamientos'),
              tiempo: await getDetalles(`${producto}`,'Tiempo de preparación'),
              otros: await getDetalles(`${producto}`,'Caracteristicas importantes')
            }
          }
        } else {
          error = true;
        }
        // Logs
        console.log(fecha1);
        console.log(fecha2);
        console.log(producto);
        console.log(one)
        if (!error) {
          return res.status(200).json(one);
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

}

const productoC = new ProductoC();
export default productoC;