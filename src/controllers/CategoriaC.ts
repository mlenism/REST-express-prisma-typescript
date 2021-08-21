import { Request, Response } from 'express';
import { prisma } from '../Services/Services';
import loginC from '../controllers/LoginC'

class CategoriaC {

  private async getManyPrisma() {
    let error = false;
    const many = await prisma.categoria.findMany({
      where: {
        AND: {
          habilitado: true,
          producto: {
            some: {
              habilitado: true
            }
          }
        }
      },
      select: {
        numero: true,
        nombre: true,
        imagen: true,
        descripcion: true
      }
    }).catch(err => {
      console.log(err);
      error = true;
    });
    return {
      many: many,
      error: error
    }
  }

  public async getMany(req: Request, res: Response): Promise<Response> {
    console.log(`\n****Get Many Categoria sin cuenta****\n`)
    const get = await categoriaC.getManyPrisma();
    const many = get.many;
    const error = get.error;
    if (!error) {
      console.log('Get exitoso.')
      return res.status(200).json(many);
    } else {
      console.log('No se pudieron obtener las categorias')
      return res.status(500).json(many);
    }
  }

  public async getManyLog(req: Request, res: Response): Promise<Response> {
    console.log(`\n****Get Many Categoria con cuenta****\n`)
    let many: any[] | void = [];
    let error = false;
    const { id } = req.params;
    const log = await loginC.getFindLog(id);
    console.log(`El toquen para categoria es : ${id.substring(0,10)}.\n`);
      if (log.admin) {
        many = await prisma.categoria.findMany({
          where: {
            habilitado: true
          },
          select: {
            numero: true,
            nombre: true,
            imagen: true,
            descripcion: true
          }
        }).catch(err => {
          console.log(err);
          error = true
        });
      } else {
        const get = await categoriaC.getManyPrisma();
        many = get.many;
        error = get.error;
      }
    if (!(error && log.error)) {
      console.log('Get exitoso.')
      return res.status(200).json(many);
    } else {
      console.log('Error, no se pudo obtener las categorias');
      return res.status(500).json(many);
    }
  }

  public async getOne(req: Request, res: Response): Promise<Response> {
    console.log(`\n****Get One****\n`);
    console.log(`params: ${req.params.id}`)
    const get = await prisma.categoria.findUnique({
      where: {
        nombre: req.params.id
      },
      select: {
        nombre: true,
        descripcion: true,
        imagen: true,
        numero: true,
      }
    }).catch(err => console.log(err));
    if (get) {
      console.log('Get exitoso');
      return res.status(200).json(get);
    } else {
      console.log(`No se encontró la categoría ${req.params.id}`)
      return res.status(404).json(`No se encontró la categoría ${req.params.id}`)
    }
  }

  public async create(req: Request, res: Response): Promise<Response> {
    console.log(`\n****Create Categoria****\n`);
    console.log(req.body);
    let status = 201;
    let data = {};
    const create = await prisma.categoria.create({
      data: {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        imagen: req.body.imagen
      }
    }).catch(err => {
      console.log(err);
      if (err.code === 'P2002') {
        status = 400;
        const yaExiste = 'ya existe';
        switch (err.meta.target[0]) {
          case 'nombre':
            data = { nombre: yaExiste };
            break;
          case 'imagen':
            data = { imagen: yaExiste };
            break;
        }
      }
    });
    if (create) {
      console.log('Se ha creado la categoria!!!\n')
      return res.status(status).json('Acción realizada con exito');
    } else {
      console.log('No se creó la categoria')
      return res.status(status).json(data);
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    console.log(`\n****Delete Categoria****\n`);
    let status = 201;
    const { id } = req.params;
    console.log(id);
    const borrar = await prisma.categoria.update({
      where: {
        nombre: id
      },
      data: {
        habilitado: false,
        producto: {
          updateMany: {
            where: {
              habilitado: true
            },
            data: {
              habilitado: false
            }
          }
        }
      }
    }).catch(err => {
      console.log(err);
      if (err.code === 'P2025') {
        status = 404;
      } else {
        status = 500;
      }
    })
    if (borrar) {
      console.log('Borrado con exito!')
      return res.status(status).send('ok');
    } else {
      console.log('Error, no se pudo borrar.')
      return res.status(status).send('error');
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    console.log(`\n****Update categoria****\n`)
    const update = await prisma.categoria.update({
      where: {
        numero: req.body.uuid,
      },
      data: {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        imagen: req.body.imagen,
      }
    }).catch(err => console.log(err));
    console.log(update)
    if (update) {
      console.log('Actulización exitosa');
      return res.status(201).json('Actulización exitosa');
    } else {
      console.log('Actulización fallida');
      return res.status(500).json('Actulización fallida');
    }
  }

}

const categoriaC = new CategoriaC();
export default categoriaC;