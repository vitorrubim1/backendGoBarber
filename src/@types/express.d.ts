/* eslint-disable @typescript-eslint/naming-convention */

// Declarando uma nova definição de tipo pro express
declare namespace Express {
  export interface Request {
    // As informações que eu puser aqui, não substitui a do express, ele só faz um anexo, só acrescenta
    user: {
      id: string;
    };
  }
}
