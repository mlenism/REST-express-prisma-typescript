import { Request, Response } from 'express';
import { prisma } from '../Services/Services';

class CategoriaC {

  public async getMany(req: Request, res: Response): Promise<Response> {
    try {
      const many = await prisma.categoria.findMany({
        select: {
          nombre: true,
          imagen: true,
          descripcion: true
        }
      });
      console.log(many)
      return res.status(200).send(many);
    } catch (e) {
      console.log(e);
      return res.status(500);
    }
  }

}

const categoriaC = new CategoriaC();
export default categoriaC;