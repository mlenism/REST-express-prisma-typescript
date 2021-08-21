import { Router } from 'express';
import productoC from '../controllers/ProductoC';
import productoV  from '../Validators/ProductoV';

class ProductoR {

  private router: Router;

  constructor() {
    this.router = Router();
    this.config();
  }

  private config() {
    this.router.get('/', productoC.getMany);
    this.router.get('/one', productoC.getOne);
    this.router.post('/', productoV.createRules(), productoV.checkErrors, productoC.create);
    this.router.put('/', productoV.updateRules(), productoV.checkErrors, productoC.update);
    this.router.delete('/:id', productoV.desactivateRules, productoV.checkErrors, productoC.desactivate)
  }

  public getRouter(): Router {
    return this.router;
  }
}

const productoR = new ProductoR();
export default productoR.getRouter();