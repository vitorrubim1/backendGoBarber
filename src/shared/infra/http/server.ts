import 'reflect-metadata'; // typeorm exige por conta que utilizamos decorators
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors'; // pra tratar erros assíncronos que vem das rotas

import uploadConfig from '@config/upload'; // arquivo de configuração de upload de imagem
import AppError from '@shared/errors/AppError'; // classe de erros

import routes from './routes';
import '@shared/infra/typeorm';
import '@shared/container'; // injeção de dependência

const app = express();

app.use(cors()); // habilitando cors, para web requisitar
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadsFolder)); // servindo pra aplicação de forma estática o arquivo físico, as imagens
app.use(routes); // usando o arquivo index de rotas

/*
middleware de errors, tem que ser usado dps da rota, já que os erros acontecem nas rotas em si
middleware específicos para tratar erros eles são obrigados a terem 4 parâmetros
*/

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  // "_": pq não estou usando
  // verificar se o erro que deu, é uma instância da classe se for é erro da aplicação
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  // erro que aconteceu internamente na aplicação, porém é um erro que não esperado
  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333, () => {
  console.log('Server is running... 🚀');
});
