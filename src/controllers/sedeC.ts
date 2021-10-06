import { Request, Response } from 'express';
import { prisma } from '../Services/Services';

class SedeC {

  public async getSede(req: Request, res: Response): Promise<Response> {
    const many = await prisma.sede.findMany({
      where: {
        habilitado: true
      },
      select: {
        codigo: true,
        nit: true,
        direccion: true,
        telefono: true,
        abierto: true,
        imagen: true,
        horario: {
          select: {
            dia: true,
            abre: true,
            cierra: true
          }
        }
      }
    })
    return res.status(200).json(many);
  }

  public async getSedeReporte(req: Request, res: Response): Promise<Response> {
    let array = [];

    const many = await prisma.sede.findMany({
      select: {
        direccion: true
      }
    })

    const sede = async (direccion: string) =>
      await prisma.producto_ventas.aggregate({
        where: {
          producto: {
            factura_producto: {
              every: {
                factura: {
                  sede: {
                    direccion: direccion
                  }
                }
              }
            }
          }
        },
        _sum: {
          ventas: true
        }
    })

    for (let i = 0; i < many.length; i++) {
      const e = many[i];
      const data = await sede(e.direccion);
      const elemento = {
        nombre: e.direccion,
        ventas: data._sum.ventas
      }
      array.push(elemento);
    }

    const compare = (a: any, b: any) => {
      if (a.ventas > b.ventas) {
        return -1;
      }
      if (a.ventas < b.ventas) {
        return 1;
      }
      return 0;
    }

    array.sort(compare)

    const data_to_send = array.slice(0, 20);

    return res.status(200).json(data_to_send);
  }

}

const sedeC = new SedeC();
export default sedeC;