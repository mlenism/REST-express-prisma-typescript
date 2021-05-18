import { Router } from 'express';
import productoC from '../controllers/ProductoC';

class ProductoR {

  private router: Router;

  constructor() {
    this.router = Router();
    this.config();
  }

  private config() {
    this.router.get('/', productoC.getMany);
  }

  public getRouter(): Router {
    return this.router;
  }
}

const productoR = new ProductoR();
export default productoR.getRouter();