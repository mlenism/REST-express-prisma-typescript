import { Router } from 'express';
import detalleC from '../controllers/DetalleC';

class DetalleR {

  private router: Router;

  constructor() {
    this.router = Router();
    this.config();
  }

  private config() {
    this.router.get('/', detalleC.getMany);
  }

  public getRouter(): Router {
    return this.router;
  }
}

const detalleR = new DetalleR();
export default detalleR.getRouter();