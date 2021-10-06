import { Request, Response } from 'express';
import { prisma } from '../Services/Services';

class UsuarioC {

  public async getMany(req: Request, res: Response): Promise<Response> {
    console.log(`\n****Get Many Usuario****\n`);
    console.log(req.body);
    let data: any[] = [];
    const many = await prisma.usuario.findMany({
      where: {
        habilitado: true
      },
      select: {
        correo: true,
        nombres: true,
        apellidos: true,
        direccion: true,
        nacimiento: true,
        telefono: true,
        usuario_rol: {
          select: {
            rol: {
              select: {
                nombre: true
              }
            }
          }
        },
        usuario_documento: {
          select: {
            documento: {
              select: {
                nombre: true
              }
            },
            clave: true
          }
        }
      }
    }).catch(err => {console.log(err)});

    if (many) {
      for (let i = 0; i < many.length; i++) {
        const e = many[i];
        const d = new Date(e.nacimiento);
        const fecha = `${d.getUTCFullYear()}-${("0" + (d.getUTCMonth() + 1)).slice(-2)}-${("0" + (d.getUTCDate())).slice(-2)}`;
        data.push({
          id: e.correo,
          nombres: e.nombres,
          apellidos: e.apellidos,
          direccion: e.direccion,
          nacimiento:  fecha,
          telefono: e.telefono,
          rol: e.usuario_rol?.rol.nombre,
          documento: e.usuario_documento?.documento.nombre,
          documento_key: e.usuario_documento?.clave
        });
      }
      console.log('Get many exitoso.')
      return res.status(200).json(data);
    } else {
      console.log('Algo salió mal.')
      return res.status(500).json(data);
    }
  }

  public async getOne(req: Request, res: Response): Promise<Response> {
    console.log(`\n****Get Many Usuario****\n`);
    const { email } = req.params;
    let data: any = {};
    const get = await prisma.usuario.findUnique({
      where: {
        correo: email
      },
      select: {
        nombres: true,
        apellidos: true,
        direccion: true,
        nacimiento: true,
        telefono: true,
        usuario_rol: {
          select: {
            rol: {
              select: {
                nombre: true
              }
            }
          }
        },
        usuario_documento: {
          select: {
            documento: {
              select: {
                nombre: true
              }
            },
            clave: true
          }
        }
      }
    }).catch(err => console.log(err));
    if (get) {
      const d = new Date(get?.nacimiento);
      const fecha = `${d.getUTCFullYear()}-${("0" + (d.getUTCMonth() + 1)).slice(-2)}-${("0" + (d.getUTCDate())).slice(-2)}`;
      data = {
        nombres: get?.nombres,
        apellidos: get?.apellidos,
        direccion: get?.direccion,
        nacimiento: fecha,
        telefono: get?.telefono,
        rol: get?.usuario_rol?.rol.nombre,
        documento: get?.usuario_documento?.documento.nombre,
        documento_key: get.usuario_documento?.clave
      };
      console.log('Get One exitoso.')
      return res.status(200).json(data);
    } else {
      console.log('Algo salió mal.')
      return res.status(500).json(data);
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    console.log(`\n****Update Usuario****\n`);

    console.log(req.body)
    const {direccion, telefono, email, nombres, apellidos, id, numeroid, fechaNacimiento, rol} = req.body;
    const update = await prisma.usuario.update({
      where: {
        correo: email
      },
      data: {
        direccion: direccion,
        telefono: telefono,
        nombres: nombres,
        apellidos: apellidos,
        nacimiento: new Date(fechaNacimiento),
        usuario_documento: {
          update: {
            clave: numeroid,
            documento: {
              connect: {
                nombre: id
              }
            }
          }
        },
        usuario_rol: {
          update: {
            rol: {
              connect: {
                nombre: rol
              }
            }
          }
        }
      }
    }).catch(err => console.log(err))
    if (update) {
      console.log('Actualizado.')
      return res.status(201).json('ok');
    } else {
      console.log('Hubo un error.')
      return res.status(500).json('error');
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    console.log(`\n****Update Usuario****\n`)
    const { email } = req.params;
    console.log(email)
    const dlt = await prisma.usuario.update({
      where: {
        correo: email
      },
      data: {
        habilitado: false
      }
    }).catch(err => console.log(err));
    if (dlt) {
      console.log('Borrado con exito')
      return res.status(201).json('ok');
    } else {
      console.log('Algo salió mal.')
      return res.status(500).json('error');
    }
  }

}

const usuarioC = new UsuarioC();
export default usuarioC;