import { Router } from 'express';
import resporteC from '../controllers/ReporteC';

class ReporteR {

  private router: Router;

  constructor() {
    this.router = Router();
    this.config();
  }

  private config() {
    this.router.get('/mas', resporteC.getMasVendidos.bind(resporteC));
    this.router.get('/menos', resporteC.getMenosVendidos.bind(resporteC));
    this.router.get('/cumple', resporteC.fechaDeCumple.bind(resporteC));
    this.router.post('/', resporteC.ventasPorFecha.bind(resporteC));
  }

  public getRouter(): Router {
    return this.router;
  }
}

const reporteR = new ReporteR();
export default reporteR.getRouter();