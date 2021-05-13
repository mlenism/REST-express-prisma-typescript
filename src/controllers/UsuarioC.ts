import { Request, Response } from 'express';
import { prisma } from '../Services/Services';

class UsuarioC {

  public async getMany(req: Request, res: Response): Promise<Response> {
    try {
      const many = await prisma.usuario.findMany({
        select: {
          correo: true,
          nombre: true,
          admin: true
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

const usuarioC = new UsuarioC();
export default usuarioC;