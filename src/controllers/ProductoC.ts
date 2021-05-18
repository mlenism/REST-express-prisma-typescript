import { Request, Response } from 'express';
import { prisma } from '../Services/Services';

class ProductoC {

  public async getMany(req: Request, res: Response): Promise<Response> {
    console.log(`\n****Get Many Producto****\n`)
    try {
      console.log(req.query);
      if (req.query.categoria !== undefined) {
        const categoria = req.query.categoria;
        const many = await prisma.producto.findMany({
          where: {
            categoria: {
              nombre: `${categoria}`
            }
          },
          select: {
            nombre: true,
            imagen: true,
            descripcion: true
          }
        });
        // Logs
        many.forEach(element => {
          console.log(element.nombre)
        });
        return res.status(200).json(many);
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