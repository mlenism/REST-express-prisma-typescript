import { Router } from 'express';
import categoriaC from '../controllers/CategoriaC';
import categoriaV from '../Validators/CategoriaV';

class CategoriaR {

  private router: Router;

  constructor() {
    this.router = Router();
    this.config();
  }

  private config() {
    this.router.get('/', categoriaC.getMany);
    this.router.get('/:id', categoriaC.getManyLog);
    this.router.get('/one/:id', categoriaV.nameRules, categoriaV.checkErrors, categoriaC.getOne);
    this.router.post('/', categoriaV.baseRules, categoriaV.checkErrors, categoriaC.create);
    this.router.delete('/:id', categoriaV.nameRules, categoriaV.checkErrors,  categoriaC.delete);
    this.router.put('/', categoriaV.updateRules(), categoriaV.checkErrors, categoriaC.update);
  }

  public getRouter(): Router {
    return this.router;
  }
}

const categoriaR = new CategoriaR();
export default categoriaR.getRouter();