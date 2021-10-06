import { Router } from 'express';
import sedeC from '../controllers/sedeC';

class Sede {

  private router: Router;

  constructor() {
    this.router = Router();
    this.config();
  }

  private config() {
    this.router.get('/', sedeC.getSede);
    this.router.get('/reporte', sedeC.getSedeReporte);
  }

  public getRouter(): Router {
    return this.router;
  }
}

const sedeR = new Sede();
export default sedeR.getRouter();