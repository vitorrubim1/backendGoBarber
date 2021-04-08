declare namespace Express {
  // declarando uma nova definição de tipo pro express

  export interface IRequest {
    // as informações que eu puser aqui, não substitui a do express, ele só faz um anexo, só acrescenta

    user: {
      // essa é a nova informação que eu desejo
      id: string;
    };
  }
}
