import { Request, Response } from 'express';
import { prisma } from '../Services/Services';

class ReporteC {

  private readonly fecha: Date;

  constructor() {
    this.fecha = new Date(new Date().toUTCString());
  }

  public async getMasVendidos(req: Request, res: Response): Promise<Response> {
    let array = [];

    const many = await prisma.producto.findMany({
      select: {
        nombre: true,
      }
    })

    const products = async (name: string) =>
    await prisma.producto_ventas.aggregate({
      _sum: {
        ventas: true
      },
      where: {
        producto: {
          nombre: name
        }
      }
    })

    for (let i = 0; i < many.length; i++) {
      const e = many[i];
      const data = await products(e.nombre);
      const elemento = {
        nombre: e.nombre,
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

  public async getMenosVendidos(req: Request, res: Response): Promise<Response> {
    let array = [];

    const many = await prisma.producto.findMany({
      select: {
        nombre: true,
      }
    })

    const products = async (name: string) =>
    await prisma.producto_ventas.aggregate({
      _sum: {
        ventas: true
      },
      where: {
        producto: {
          nombre: name
        }
      }
    })

    for (let i = 0; i < many.length; i++) {
      const e = many[i];
      const data = await products(e.nombre);
      const elemento = {
        nombre: e.nombre,
        ventas: data._sum.ventas
      }
      array.push(elemento);
    }

    const compare = (a: any, b: any) => {
      if (a.ventas < b.ventas) {
        return -1;
      }
      if (a.ventas > b.ventas) {
        return 1;
      }
      return 0;
    }

    array.sort(compare)

    const data_to_send = array.slice(0, 20);

    return res.status(200).json(data_to_send);
  }

  public async ventasPorFecha(req: Request, res: Response): Promise<Response> {
    const { fechaInicial, fechaFinal, nombre } = req.body
    let array = [];

    const one = await prisma.producto.findUnique({
      where: {
        nombre: nombre
      },
      select: {
        nombre: true,
        producto_ventas: {
          where: {
            tiempo: {
              gte: new Date(fechaInicial),
              lte: new Date(fechaFinal)
            }
          },
          select: {
            ventas: true,
            tiempo: true
          }
        }
      }
    })
    return res.status(200).json(one)
  }

  public async fechaDeCumple(req: Request, res: Response): Promise<Response> {
    let array = [];
    const fecha = this.fecha;
    fecha.setMonth(fecha.getMonth() + 1);
    console.log(fecha)
    const many = await prisma.usuario.findMany({
      select: {
        nombres: true,
        apellidos: true,
        nacimiento: true
      }
    })

    for (let i = 0; i < many.length; i++) {
      const e = many[i];
      const date = new Date(e.nacimiento);
      const year = this.fecha.getFullYear();
      const month = e.nacimiento.getMonth();
      const day = e.nacimiento.getDate();
      const fecha = `${year}-${month}-${day}`
      const new_date = new Date(fecha);
      const difference = new_date.getTime() - this.fecha.getTime();
    }

    return res.status(200).json(many)
  }

}

const reporteC = new ReporteC();
export default reporteC;