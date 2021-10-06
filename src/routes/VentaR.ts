import { Router } from 'express';
import ventaC from '../controllers/VentaC';

class VentaR {

  private router: Router;

  constructor() {
    this.router = Router();
    this.config();
  }

  private config() {
    this.router.post('/', ventaC.makeVenta.bind(ventaC));
  }

  public getRouter(): Router {
    return this.router;
  }
}

const ventaR = new VentaR();
export default ventaR.getRouter();