import { Router } from 'express';
import categoriaC from '../controllers/CategoriaC';

class CategoriaR {

  private router: Router;

  constructor() {
    this.router = Router();
    this.config();
  }

  private config() {
    this.router.get('/', categoriaC.getMany);
  }

  public getRouter(): Router {
    return this.router;
  }
}

const categoriaR = new CategoriaR();
export default categoriaR.getRouter();