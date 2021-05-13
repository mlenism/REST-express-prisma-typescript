import { Request, Response } from 'express';
import { prisma } from '../Services/Services';
import { tipo_id } from '@prisma/client';

class TipoIdC {

  public async getMany(req: Request, res: Response): Promise<Response> {
    try {
      const many: tipo_id[] = await prisma.tipo_id.findMany();
      console.log(many)
      return res.status(200).send(many);
    } catch (e) {
      console.log(e);
      return res.status(500);
    }
  }

}

const tipoIdC = new TipoIdC();
export default tipoIdC;