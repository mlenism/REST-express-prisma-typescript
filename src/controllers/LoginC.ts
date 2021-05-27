import { Request, Response } from 'express';
import { googleClient, prisma } from '../Services/Services';

class LoginC {

  public async postLog(req: Request, res: Response): Promise<Response> {
    try {
      const { tokenId } = req.body;
      console.log(`El toquen : ${tokenId}\n`);
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
              }
            });
            if (existingUser) {
              console.log('Existe usuario\n');
              isUser = true;
              isAdmin = existingUser.admin
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
      if (error) {
        return res.status(500)
      } else {
        return res.status(200).json({
          existe: isUser,
          admin: isAdmin
        })
      }
    } catch (error) {
      console.log(`Error en la petición post\n${error}`);
      return res.status(500);
    }
  }

  public async post(req: Request, res: Response): Promise<Response> {
    try {
      const { tokenId } = req.body;
      console.log(`El toquen : ${tokenId}\n`);
      let error: boolean = false;
      let isAdmin: boolean = false;

      await googleClient.verifyIdToken({
        idToken: tokenId,
        audience: process.env.CLIENT_ID
      }).then(
        async resp => {
          const dataToken = {
            userId: resp.getUserId(),
            email: resp.getPayload()?.email,
            name: resp.getPayload()?.name
          }
          console.log(`User id: ${dataToken.userId}\n`)
          console.log(`email: ${dataToken.email}\n`)
          console.log(`name: ${dataToken.name}\n`)
          if (!(dataToken.userId === null || dataToken.name === undefined ||
            dataToken.name === undefined)) {
            try {
              const existingUser = await prisma.usuario.findUnique({
                where: {
                  cuenta_id: dataToken.userId
                }
              });
              if (existingUser) {
                console.log('Existe usuario');
                isAdmin = existingUser.admin
              } else {
                console.log('No existe usuario, se va a crear\n')
                const user = await prisma.usuario.create({
                  data: {
                      cuenta_id: dataToken.userId || '',
                      correo: dataToken.email || '',
                      nombre: dataToken.name || '',
                    }
                });
                console.log('Usuario creado\n')
              }
            } catch (error) {
              console.log(`Error al intentar crear usuario\n${error}`);
              error = true;
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
        return res.status(500)
      } else {
        return res.status(200).json({admin: isAdmin})
      }
    } catch (error) {
      console.log(`Error en la petición post\n${error}`);
      return res.status(500);
    }
  }

}

const loginC = new LoginC();
export default loginC;