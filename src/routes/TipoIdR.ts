import { Router } from 'express';
import tipoIdC from '../controllers/TipoIdC';

class TipoIdR {

  private router: Router;

  constructor() {
    this.router = Router();
    this.config();
  }

  private config() {
    this.router.get('/', tipoIdC.getMany);
  }

  public getRouter(): Router {
    return this.router;
  }
}

const tipoIdR = new TipoIdR();
export default tipoIdR.getRouter();