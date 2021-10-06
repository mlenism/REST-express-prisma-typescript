import { Router } from 'express';
import usuarioC from '../controllers/UsuarioC';
import usuarioV from '../Validators/UsuarioV';

class UsuarioR {

  private router: Router;

  constructor() {
    this.router = Router();
    this.config();
  }

  private config() {
    this.router.get('/', usuarioC.getMany);
    this.router.get('/:email', usuarioC.getOne);
    this.router.put('/', usuarioV.baseRules, usuarioV.checkErrors, usuarioC.update);
    this.router.delete('/:email', usuarioC.delete);
  }

  public getRouter(): Router {
    return this.router;
  }
}

const usuarioR = new UsuarioR();
export default usuarioR.getRouter();