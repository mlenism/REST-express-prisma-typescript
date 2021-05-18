import { Request, Response } from 'express';
import { prisma } from '../Services/Services';

class CategoriaC {

  public async getMany(req: Request, res: Response): Promise<Response> {
    console.log(`\n****Get Many Categoria****\n`)
    try {
      console.log(req.body)
      const many = await prisma.categoria.findMany({
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
    } catch (e) {
      console.log(e);
      return res.status(500);
    }
  }

}

const categoriaC = new CategoriaC();
export default categoriaC;