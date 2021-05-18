import { Request, Response } from 'express';
import { prisma } from '../Services/Services';
import { tipo_id } from '@prisma/client';

class TipoIdC {

  public async getMany(req: Request, res: Response): Promise<Response> {
    try {
      console.log(`\n****Get Many TipoId****\n`)
      console.log(req.body)
      const many: tipo_id[] = await prisma.tipo_id.findMany();
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

const tipoIdC = new TipoIdC();
export default tipoIdC;