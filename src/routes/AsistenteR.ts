import { Router } from 'express';
import asistenteC from '../controllers/AsistenteC';

class AsistenteR {

  private router: Router;

  constructor() {
    this.router = Router();
    this.config();
  }

  private config() {
    this.router.post('/', asistenteC.getAsstente);
  }

  public getRouter(): Router {
    return this.router;
  }
}

const asistenteR = new AsistenteR();
export default asistenteR.getRouter();