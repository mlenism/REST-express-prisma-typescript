import { NextFunction, Request, Response } from 'express';
import { body, param, ValidationError, validationResult } from 'express-validator';

class CategoriaV {

  public baseRules = [
    body('nombre')
      .exists()
      .withMessage('undefined')
      .notEmpty()
      .withMessage('Campo obligarorio')
      .matches(/^[A-Za-z0-9 .,'!¡ñÑáÁéÉíÍóÓúÚüÜ¿?]+$/)
      .withMessage('Solo debe contener letras del alfabeto latino')
      .isLength({max: 60})
      .withMessage('Demasiados caracteres'),
    body('descripcion')
      .exists()
      .withMessage('undefined')
      .notEmpty()
      .withMessage('Campo obligarorio')
      .matches(/^[A-Za-z0-9 .,'!¡ñÑáÁéÉíÍóÓúÚüÜ¿?%&$/]+$/)
      .withMessage('Ha introducido caracteres no permitidos')
      .isLength({max: 150})
      .withMessage('Demasiados caracteres'),
    body('imagen')
      .exists()
      .withMessage('undefined')
      .notEmpty()
      .withMessage('Campo obligarorio')
      .isURL()
      .withMessage('URL invalida')
      .isLength({max: 300})
      .withMessage('Demasiados caracteres'),
  ];

  public nameRules = [
    param('id')
      .matches(/^[A-Za-z0-9 .,'!¡ñÑáÁéÉíÍóÓúÚüÜ¿?]+$/)
      .withMessage('nombre invalido')
      .isLength({max: 60})
      .withMessage('Demasiados caracteres')
  ];

  public updateRules() {
    let updateRules: any[] = [];
    updateRules.push(...categoriaV.baseRules);
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

const categoriaV = new CategoriaV();
export default categoriaV;