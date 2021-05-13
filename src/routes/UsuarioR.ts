import { Router } from 'express';
import usuarioC from '../controllers/UsuarioC';

class UsuarioR {

  private router: Router;

  constructor() {
    this.router = Router();
    this.config();
  }

  private config() {
    this.router.get('/', usuarioC.getMany);
  }

  public getRouter(): Router {
    return this.router;
  }
}

const usuarioR = new UsuarioR();
export default usuarioR.getRouter();