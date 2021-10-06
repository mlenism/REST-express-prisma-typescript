import { Request, Response } from 'express';
import { googleClient, prisma } from '../Services/Services';

class LoginC {

  public async getFindLog(tokenId: string) {
    let error: boolean = false;
    let isUser: boolean = false;
    let isAdmin: boolean = false;

    await googleClient.verifyIdToken({
      idToken: tokenId,
      audience: process.env.CLIENT_ID
    }).then(
      async resp => {
        if (typeof(resp.getUserId()) === 'string') {
          const existingUser = await prisma.usuario.findUnique({
            where: {
              cuenta_id: resp.getUserId() || ''
            },
            select: {
              usuario_rol: {
                select: {
                  rol: {
                    select: {
                      nombre: true
                    }
                  }
                }
              },
              habilitado: true
            }
          }).catch(err => {
            console.log(err);
            error = true;
          });
          if (existingUser) {
            console.log('Existe usuario ver admin\n');
            isUser = existingUser.habilitado;
            if (isUser) {
              isAdmin = existingUser.usuario_rol?.rol.nombre === 'administrador'
            }
            console.log(`isAdmin: ${existingUser.usuario_rol?.rol.nombre}`)
          } else {
            console.log('No existe usuario\n');
          }
        } else {
          console.log(`typeof userId === ${typeof(resp.getUserId())}\n`);
          error = true;
        }
      },
      err => {
        console.log(`A ocurrido un error auntenticando\n${err}`)
        error = true;
      }
    )
    const data = {
      error: error,
      existe: isUser,
      admin: isAdmin
    };
    console.log(data)
    return data;
  }

  public async findLog(req: Request, res: Response): Promise<Response> {
      console.log(`\n****Post find log****\n`);
      const { tokenId } = req.body;
      const log = await loginC.getFindLog(tokenId);
      if (log.error) {
        return res.status(500)
      } else {
        return res.status(200).json({
          existe: log.existe,
          admin: log.admin
        })
      }
  }

  public async post(req: Request, res: Response): Promise<Response> {
    try {
      console.log(`\n****Post crear log****\n`);
      const { tokenId, telefono, direccion, fechaNacimiento, numeroid, id} = req.body;
      console.log(`El toquen : ${tokenId.substring(0,10)}\n`);
      let error: boolean = false;
      let rol: string = 'cliente';

      await googleClient.verifyIdToken({
        idToken: tokenId,
        audience: process.env.CLIENT_ID
      }).then(
        async resp => {
          const dataToken = {
            userId: resp.getUserId(),
            email: resp.getPayload()?.email,
            name: resp.getPayload()?.given_name,
            lastName: resp.getPayload()?.family_name,
          }
          console.log(`User id: ${dataToken.userId}\n`)
          console.log(`email: ${dataToken.email}\n`)
          console.log(`name: ${dataToken.name}\n`)
          if (!(dataToken.userId === null || dataToken.name === undefined || dataToken.name === undefined)) {
            const existingUser = await prisma.usuario.findUnique({
              where: {
                cuenta_id: dataToken.userId
              },
              select: {
                usuario_rol: {
                  select: {
                    rol: {
                      select: {
                        nombre: true
                      }
                    }
                  }
                },
                habilitado: true
              }
            });
            if (existingUser) {
              console.log('Existe usuario\nHabilitado:');
              console.log(existingUser.habilitado)
              if (existingUser.habilitado) {
                rol = existingUser.usuario_rol?.rol.nombre + '';
              } else {
                console.log('Se ha deshabilitado el usuario, se rehabilitará.')
                await prisma.usuario.update({
                  where: {
                    cuenta_id: dataToken.userId
                  },
                  data: {
                    correo: dataToken.email || '',
                    nombres: dataToken.name || '',
                    apellidos: dataToken.lastName || '',
                    telefono: telefono,
                    direccion: direccion,
                    nacimiento: new Date(fechaNacimiento),
                    habilitado: true,
                    usuario_documento: {
                      update: {
                        clave: numeroid,
                        documento: {
                          connect: {
                            nombre: id
                          }
                        }
                      }
                    }
                  }
                }).catch(err => {
                  console.log(err);
                  error = true;
                })
                if (!error) {
                  console.log('Usuario rehabilitado')
                }
              }
            } else {
              console.log('No existe usuario, se va a crear\n')
              await prisma.usuario.create({
                data: {
                  cuenta_id: dataToken.userId || '',
                  correo: dataToken.email || '',
                  nombres: dataToken.name || '',
                  apellidos: dataToken.lastName || '',
                  telefono: telefono,
                  direccion: direccion,
                  nacimiento: new Date(fechaNacimiento),
                  usuario_documento: {
                    create: {
                      documento: {
                        connect: {
                          nombre: id
                        }
                      },
                      clave: numeroid
                    }
                  },
                  usuario_rol: {
                    create: {
                      rol: {
                        connect: {
                          nombre: 'cliente'
                        }
                      }
                    }
                  }
                }
              }).catch(err => {
                error = true;
                console.log(err);
              });
              if (!error) {
                console.log('Usuario creado\n')
              }
            }
          } else {
            console.log(`Valores de la cuenta incompletos`);
            error = true;
          }
        },
        err => {
          console.log(`A ocurrido un error auntenticando\n${err}`)
          error = true;
        }
      )
      if (error) {
        return res.status(500).json('error');
      } else {
        return res.status(200).json({rol: rol})
      }
    } catch (error) {
      console.log(`Error en la petición post\n${error}`);
      return res.status(500).json('error');
    }
  }

}

const loginC = new LoginC();
export default loginC;