import { Request, Response } from 'express';
import { prisma } from '../Services/Services';

class AsistenteC {

  public async getAsstente(req: Request, res: Response): Promise<Response> {
    const { op1, op2, op3, op4 } = req.body;
    console.log(req.body)
    let msg = '';
    let op = '';

    const case111 = () => {
      switch (op4) {
        case 0:
          op  = "op4";
          msg = "Escribe el número de la opción que vas a eligir:\n" +
                "1. OP1111.\n" +
                "2. OP1112.";
          break;
        case 1:
          break;
        case 2:
          break;
        default:
          break;
      }
    }

    const case112 = () => {
      switch (op4) {
        case 0:
          op  = "op4";
          msg = "Escribe el número de la opción que vas a eligir:\n" +
                "1. OP1121.\n" +
                "2. OP1122.";
          break;
        case 1:
          break;
        case 2:
          break;
        default:
          break;
      }
    }

    const case121 = () => {
      switch (op4) {
        case 0:
          op  = "op4";
          msg = "Escribe el número de la opción que vas a eligir:\n" +
                "1. OP1211.\n" +
                "2. OP1212.";
          break;
        case 1:
          break;
        case 2:
          break;
        default:
          break;
      }
    }

    const case122 = () => {
      switch (op4) {
        case 0:
          op  = "op4";
          msg = "Escribe el número de la opción que vas a eligir:\n" +
                "1. OP1221.\n" +
                "2. OP1222.";
          break;
        case 1:
          break;
        case 2:
          break;
        default:
          break;
      }
    }

    const case211 = () => {
      switch (op4) {
        case 0:
          op  = "op4";
          msg = "Escribe el número de la opción que vas a eligir:\n" +
                "1. OP2111.\n" +
                "2. OP2112.";
          break;
        case 1:
          break;
        case 2:
          break;
        default:
          break;
      }
    }

    const case212 = () => {
      switch (op4) {
        case 0:
          op  = "op4";
          msg = "Escribe el número de la opción que vas a eligir:\n" +
                "1. OP2121.\n" +
                "2. OP2122.";
          break;
        case 1:
          break;
        case 2:
          break;
        default:
          break;
      }
    }

    const case221 = () => {
      switch (op4) {
        case 0:
          op  = "op4";
          msg = "Escribe el número de la opción que vas a eligir:\n" +
                "1. OP2211.\n" +
                "2. OP2212.";
          break;
        case 1:
          break;
        case 2:
          break;
        default:
          break;
      }
    }

    const case222 = () => {
      switch (op4) {
        case 0:
          op  = "op4";
          msg = "Escribe el número de la opción que vas a eligir:\n" +
                "1. OP2221.\n" +
                "2. OP2222.";
          break;
        case 1:
          break;
        case 2:
          break;
        default:
          break;
      }
    }

    const case11 = () => {
      switch (op3) {
        case 0:
          op  = "op3";
          msg = "Escribe el número de la opción que vas a eligir:\n" +
                "1. OP111.\n" +
                "2. OP112.";
          break;
        case 1: case111();
          break;
        case 2: case112();
          break;
        default:
          break;
      }
    }

    const case12 = () => {
      switch (op3) {
        case 0:
          op  = "op3";
          msg = "Escribe el número de la opción que vas a eligir:\n" +
                "1. OP121.\n" +
                "2. OP122.";
          break;
        case 1: case121();
          break;
        case 2: case122();
          break;
        default:
          break;
      }
    }

    const case21 = () => {
      switch (op3) {
        case 0:
          op  = "op3";
          msg = "Escribe el número de la opción que vas a eligir:\n" +
                "1. OP211.\n" +
                "2. OP212.";
          break;
        case 1: case211();
          break;
        case 2: case212();
          break;
        default:
          break;
      }
    }

    const case22 = () => {
      switch (op3) {
        case 0:
          op  = "op3";
          msg = "Escribe el número de la opción que vas a eligir:\n" +
                "1. OP221.\n" +
                "2. OP222.";
          break;
        case 1: case221();
          break;
        case 2: case222();
          break;
        default:
          break;
      }
    }

    const case1 = () => {
      switch (op2) {
        case 0:
          op  = "op2";
          msg = "Escribe el número de la opción que vas a eligir:\n" +
                "1. OP11.\n" +
                "2. OP12.";
          break;
        case 1: case11();
          break;
        case 2: case12();
          break;
        default:
          break;
      }
    }

    const case2 = () => {
      switch (op2) {
        case 0:
          op  = "op2";
          msg = "Escribe el número de la opción que vas a eligir:\n" +
                "1. OP21.\n" +
                "2. OP22.";
          break;
        case 1: case21();
          break;
        case 2: case22();
          break;
        default:
          break;
      }
    }

    switch (op1) {
      case 0:
        op  = "op1";
        msg = "Hola soy tu asistente.\n" +
              "Escribe el número de la opción que vas a eligir:\n" +
              "1. OP1.\n" +
              "2. OP2.";
        break;
      case 1: case1();
        break;
      case 2: case2();
        break;
      default:
        break;
    }

    return res.status(200).json({ msg, op });
  }

}

const asistenteC = new AsistenteC();
export default asistenteC;