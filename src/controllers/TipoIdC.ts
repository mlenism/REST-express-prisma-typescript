import { Request, Response } from 'express';
import { prisma } from '../Services/Services';

class TipoIdC {

  public async getMany(req: Request, res: Response): Promise<Response> {
    try {
      console.log(`\n****Get Many TipoId****\n`)
      let data: any[] = []
      const many = await prisma.documento.findMany({
        select: {
          nombre: true
        }
      });
      // Logs
      many.forEach(element => {
        data.push(element.nombre)
      });
      console.log('Tipos de id enviados correctamente.')
      return res.status(200).json(data);
    } catch (e) {
      console.log(e);
      return res.status(500).json('error');
    }
  }

  public async getRol(req: Request, res: Response): Promise<Response> {
    try {
      console.log(`\n****Get Many Tipo de Rol****\n`)
      let data: any[] = []
      const many = await prisma.rol.findMany({
        select: {
          nombre: true
        }
      });
      // Logs
      many.forEach(element => {
        data.push(element.nombre)
      });
      console.log('Tipos de rol enviados correctamente.')
      return res.status(200).json(data);
    } catch (e) {
      console.log(e);
      return res.status(500).json('error');
    }
  }

}

const tipoIdC = new TipoIdC();
export default tipoIdC;