import { Request, Response } from 'express';
import { prisma } from '../Services/Services';

class UsuarioC {

  public async getMany(req: Request, res: Response): Promise<Response> {
    try {
      console.log(`\n****Get Many Usuario****\n`)
      console.log(req.body)
      const many = await prisma.usuario.findMany({
        select: {
          correo: true,
          nombre: true,
          admin: true
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

const usuarioC = new UsuarioC();
export default usuarioC;