import express, { Application } from 'express';
import cors from 'cors';

import tipoIdR from './routes/TipoIdR';
import LoginR from './routes/LoginR';
import categoriaR from './routes/CategoriaR';
import usuarioR from './routes/UsuarioR';
import productoR from './routes/ProductoR';

class Server {

  public app: Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  private config(): void {
    this.app.set('port', process.env.PORT || 3000);
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  private routes(): void {
    this.app.use('/tipoid', tipoIdR);
    this.app.use('/login', LoginR);
    this.app.use('/categoria', categoriaR);
    this.app.use('/usuario', usuarioR);
    this.app.use('/producto', productoR);
  }

  public start(): void {
    this.app.listen(this.app.get('port'), () => {
        console.log("server on port", this.app.get('port'));
    })
  }
}

const server = new Server();
server.start();