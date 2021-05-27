import { Request, Response } from 'express';
import { prisma } from '../Services/Services';

class DetalleC {

  public async getMany(req: Request, res: Response): Promise<Response> {
    try {
      console.log(`\n****Get Many Detalle****\n`)
      console.log(req.query.detalle)
      console.log(req.query.key)
      if (!(req.query.detalle === undefined || req.query.key === undefined)) {
        let data: string[] = []
        if (req.query.key !== '') {
          const many = await prisma.detalle.findMany({
            take: 10,
            where: {
              AND: {
                detalle_tipo: {
                  nombre: `${req.query.detalle}`
                },
                nombre: {
                  startsWith: `${req.query.key}`,
                  mode: 'insensitive'
                }
              }
            },
            select: {
              nombre: true
            }
          });
          many.forEach(element => {
            data.push(element.nombre)
          });
        }
        // Logs
        console.log(data.length)
        return res.status(200).json(data);
      } else {
        return res.status(500).json('solicitud erronea');
      }
    } catch (e) {
      console.log(e);
      return res.status(500);
    }
  }

}

const detalleC = new DetalleC();
export default detalleC;