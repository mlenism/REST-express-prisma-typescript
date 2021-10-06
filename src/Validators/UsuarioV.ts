import { NextFunction, Request, Response } from 'express';
import { body, param, ValidationError, validationResult } from 'express-validator';

class UsuarioV {

  public baseRules = [
    body('nombres')
      .exists()
      .withMessage('undefined')
      .notEmpty()
      .withMessage('Campo obligarorio')
      .matches(/^[A-Za-z ñÑáÁéÉíÍóÓúÚüÜ]+$/)
      .withMessage('Se han insertado caracteres invalidos')
      .isLength({max: 100})
      .withMessage('Demasiados caracteres'),
    body('apellidos')
      .exists()
      .withMessage('undefined')
      .notEmpty()
      .withMessage('Campo obligarorio')
      .matches(/^[A-Za-z ñÑáÁéÉíÍóÓúÚüÜ]+$/)
      .withMessage('Se han insertado caracteres invalidos')
      .isLength({max: 100})
      .withMessage('Demasiados caracteres'),
    body('direccion')
      .exists()
      .withMessage('undefined')
      .notEmpty()
      .withMessage('Campo obligarorio')
      .matches(/^[A-Za-z0-9 .,#ñÑáÁéÉíÍóÓúÚüÜ_\-]+$/)
      .withMessage('Se han insertado caracteres invalidos')
      .isLength({max: 35})
      .withMessage('Demasiados caracteres'),
    body('email')
      .exists()
      .withMessage('undefined')
      .notEmpty()
      .withMessage('Campo obligarorio')
      .isEmail()
      .withMessage('No es es un correo')
      .isLength({max: 60})
      .withMessage('Demasiados caracteres'),
    body('fechaNacimiento')
      .exists()
      .withMessage('undefined')
      .notEmpty()
      .withMessage('Campo obligarorio')
      .isDate({format: 'YYYY-MM-DD', strictMode: true})
      .withMessage('Formato invalido')
      .custom((value: string) => {
        const year = value.substring(0,4);
        if (parseInt(year) < 1900 || parseInt(year) > 2006) {
          throw new Error('año no valido')
        }
        return true;
      }),
    body('telefono')
      .exists()
      .withMessage('undefined')
      .notEmpty()
      .withMessage('Campo obligarorio')
      .isNumeric()
      .withMessage('Solo debe contener numeros')
      .isLength({max: 15})
      .withMessage('Demasiados caracteres'),
    body('rol')
      .exists()
      .withMessage('undefined')
      .notEmpty()
      .withMessage('Campo obligarorio')
      .matches(/^[A-Za-z0-9 .,'!¡ñÑáÁéÉíÍóÓúÚüÜ¿?]+$/)
      .withMessage('Se han insertado caracteres invalidos')
      .isLength({max: 13})
      .withMessage('Demasiados caracteres'),
    body('id')
      .exists()
      .withMessage('undefined')
      .notEmpty()
      .withMessage('Campo obligarorio')
      .matches(/^[A-Za-z0-9 .,'!¡ñÑáÁéÉíÍóÓúÚüÜ¿?]+$/)
      .withMessage('Se han insertado caracteres invalidos')
      .isLength({max: 35})
      .withMessage('Demasiados caracteres'),
    body('numeroid')
      .exists()
      .withMessage('undefined')
      .notEmpty()
      .withMessage('Campo obligarorio')
      .isNumeric()
      .withMessage('Solo debe contener numeros')
      .isLength({max: 20})
      .withMessage('Demasiados caracteres')
  ];

  public updateRules() {
    let updateRules: any[] = [];
    updateRules.push(...usuarioV.baseRules);
    updateRules.push(
      body('uuid')
        .exists()
        .withMessage('undefined')
        .isUUID()
        .withMessage('Debe ser un codigo UUID valido')
    )
    return updateRules;
  }

  public checkErrors(req: Request, res: Response, next: NextFunction) {
    console.log('\n*******************************************************')
    console.log(req.body);
    console.log('*******************************************************\n')
    console.log(`check errors`)
    const errors = validationResult.withDefaults({
      formatter: (err: ValidationError) => err.msg
    });
    if (!errors(req).isEmpty()) {
      console.log("Bad request")
      return res.status(400).json(errors(req).mapped());
    }
    next();
  }

}

const usuarioV = new UsuarioV();
export default usuarioV;