import { Router } from 'express';
import loginC from '../controllers/LoginC';

class LoginR {

  private router: Router;

  constructor() {
    this.router = Router();
    this.config();
  }

  private config() {
    this.router.post('/', loginC.post);
  }

  public getRouter(): Router {
    return this.router;
  }
}

const loginR = new LoginR();
export default loginR.getRouter();