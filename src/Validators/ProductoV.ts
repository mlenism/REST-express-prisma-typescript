import { NextFunction, Request, Response } from 'express';
import { body, param, ValidationError, validationResult } from 'express-validator'

class ProductoV {

  private baseRules = [
    body('productName')
      .exists()
      .withMessage('undefined')
      .notEmpty()
      .withMessage('Campo obligarorio')
      .matches(/^[A-Za-z0-9 .,'!¡ñÑáÁéÉíÍóÓúÚüÜ¿?]+$/)
      .withMessage('Solo debe contener caracteres alfanumericos')
      .isLength({max: 120})
      .withMessage('Demasiados caracteres'),
    body('categoria')
      .exists()
      .withMessage('undefined')
      .notEmpty()
      .withMessage('Campo obligarorio')
      .matches(/^[A-Za-z0-9 .,'!¡ñÑáÁéÉíÍóÓúÚüÜ¿?]+$/)
      .withMessage('Solo debe contener caracteres alfanumericos')
      .isLength({max: 60})
      .withMessage('Demasiados caracteres'),
    body('codigo')
      .exists()
      .withMessage('undefined')
      .isLength({max: 30})
      .withMessage('Demasiados caracteres'),
    body('descripcionProduct')
      .exists()
      .withMessage('undefined')
      .notEmpty()
      .withMessage('Campo obligarorio')
      .matches(/^[A-Za-z0-9 .,'!¡ñÑáÁéÉíÍóÓúÚüÜ¿?%&$/]+$/)
      .withMessage('Ha introducido caracteres no permitidos')
      .isLength({max: 300})
      .withMessage('Demasiados caracteres'),
    body('urlimg')
      .exists()
      .withMessage('undefined')
      .notEmpty()
      .withMessage('Campo obligarorio')
      .isURL()
      .withMessage('URL invalida')
      .isLength({max: 300})
      .withMessage('Demasiados caracteres'),
    body('costoProduccion')
      .exists()
      .withMessage('undefined')
      .notEmpty()
      .withMessage('Campo obligarorio')
      .isInt({gt: 0, lt: 2147483646, allow_leading_zeroes: false})
      .withMessage('Debe digitar un valor numerico valido'),
    body('ganancia')
      .exists()
      .withMessage('undefined')
      .notEmpty()
      .withMessage('Campo obligarorio')
      .isInt({gt: 0, lt: 2147483646, allow_leading_zeroes: false})
      .withMessage('Debe digitar un valor numerico valido'),
    body('ingredientes')
      .exists()
      .withMessage('undefined')
      .isArray({min: 1})
      .withMessage('Debe contener minimo 1 ingrediente'),
    body('ingredientes.*')
      .matches(/^[A-Za-z0-9 .,ñÑáÁéÉíÍóÓúÚüÜ]+$/)
      .withMessage('Solo puede añadir caracteres del alfabeto español o numeros')
      .isLength({max: 60})
      .withMessage('No se admiten más de 60 caracteres'),
    body('acompanamientos')
      .exists()
      .withMessage('undefined')
      .isArray()
      .withMessage('Debe ser array'),
    body('acompanamientos.*')
      .matches(/^[A-Za-z0-9 .,ñÑáÁéÉíÍóÓúÚüÜ]+$/)
      .withMessage('Solo puede añadir caracteres del alfabeto español o numeros')
      .isLength({max: 60})
      .withMessage('No se admiten más de 60 caracteres'),
    body('caracteristicas')
      .exists()
      .withMessage('undefined')
      .isArray({min: 3})
      .withMessage('Debe contener minimo 3 caracteristicas importantes'),
    body('caracteristicas.*')
      .matches(/^[A-Za-z0-9 .,ñÑáÁéÉíÍóÓúÚüÜ]+$/)
      .withMessage('Solo puede añadir caracteres del alfabeto español o numeros')
      .isLength({max: 60})
      .withMessage('No se admiten más de 60 caracteres'),
    body('tiempo')
      .exists()
      .withMessage('undefined')
      .notEmpty()
      .withMessage('Campo obligarorio')
      .matches(/^[A-Za-z0-9 .,ñÑáÁéÉíÍóÓúÚüÜ]+$/)
      .withMessage('Solo puede añadir caracteres del alfabeto español o numeros')
      .isLength({max: 60})
      .withMessage('No se admiten más de 60 caracteres'),
    body('stock')
      .exists()
      .withMessage('undefined')
      .notEmpty()
      .withMessage('Campo obligarorio')
      .isInt({gt: 0})
      .withMessage('Debe digitar un valor numerico valido'),
    body('iva')
      .exists()
      .withMessage('undefined')
      .if((value: string) => value !== "")
      .isInt({gt: 0, lt: 101, allow_leading_zeroes: false})
      .withMessage('Debe digitar un valor numerico valido')
  ];

  public createRules() {
    let createRules: any[] = [];
    createRules.push(...productoV.baseRules);
    createRules.push(
      body('descuento')
        .exists()
        .withMessage('undefined')
        .if((value: string) => value !== "")
        .isInt({gt: 0, lt: 100, allow_leading_zeroes: false})
        .withMessage('Debe digitar un valor numerico valido'),
      body('fecha_inicial')
        .exists()
        .withMessage('undefined')
        .if(body('descuento').notEmpty())
        .isDate()
        .withMessage('Debe insertar una fecha valida'),
      body('fecha_final')
        .exists()
        .withMessage('undefined')
        .if(body('descuento').notEmpty())
        .isDate()
        .withMessage('Debe insertar una fecha valida')
    )
    return createRules;
  }

  public updateRules() {
    let updateRules: any[] = [];
    updateRules.push(...productoV.baseRules);
    updateRules.push(
      body('uuid')
        .exists()
        .withMessage('undefined')
        .isUUID()
        .withMessage('Debe ser un codigo UUID valido'),
      body('descuentos')
        .exists()
        .withMessage('undefined')
        .isArray()
        .withMessage('Debe ser array'),
      body('descuentos.*.porcentaje')
        .exists()
        .withMessage('undefined')
        .isInt({gt: 0, lt: 101, allow_leading_zeroes: false})
        .withMessage('Debe digitar un valor numerico valido'),
      body('descuentos.*.fecha_inicial')
        .exists()
        .withMessage('undefined')
        .isDate()
        .withMessage('Debe insertar una fecha valida'),
      body('descuentos.*.fecha_final')
        .exists()
        .withMessage('undefined')
        .isDate()
        .withMessage('Debe insertar una fecha valida')
    )
    return updateRules;
  }

  public desactivateRules = [
    param('id')
      .matches(/^[A-Za-z0-9 .,'!¡ñÑáÁéÉíÍóÓúÚüÜ¿?]+$/)
      .withMessage('nombre invalido')
      .isLength({max: 120})
      .withMessage('Demasiados caracteres')
  ];

  public checkErrors(req: Request, res: Response, next: NextFunction) {
    console.log('\n*******************************************************')
    console.log(req.body)
    console.log('*******************************************************\n')
    console.log(`check errors`)
    const errors = validationResult.withDefaults({
      formatter: (err: ValidationError) => err.msg
    });
    if (!errors(req).isEmpty()) {
      console.log('Bad request')
      return res.status(400).json(errors(req).mapped());
    }
    next();
  }

}

const productoV = new ProductoV();
export default productoV;