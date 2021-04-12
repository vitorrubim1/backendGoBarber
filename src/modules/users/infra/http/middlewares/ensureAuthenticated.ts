import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '@config/auth'; // configurações do token
import AppError from '@shared/errors/AppError'; // classe de erros

// middleware responsável por verificar se o usuário está realmente autenticado

interface ITokenPayload {
  // informações que vem no token
  iat: number; // quando token foi gerado
  exp: number; // quando irá expirar
  sub: string; // nesse caso é o id do user, que será usado pra listar agendamentos...
}

// tipando manualmente já que não utilizamos a rota aq
export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  // next será responsável por prosseguir para as outras rotas, se ele não for chamado quer dizer que user não está autenticado

  // validação do token JWT
  const authHeader = request.headers.authorization; // token que vem do header da requisição

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  /*
    se existe o token, preciso separar o "Bearer" do token em si "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
    e o que separa o Bearer do token é um espaço, ex: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9, então:
  */

  const [, token] = authHeader.split(' '); // split retorna um array, o token em si vem na segunda posição

  try {
    const decoded = verify(token, authConfig.jwt.secret); // verificando se o token é válido

    const { sub } = decoded as ITokenPayload; // forçando a tipagem de uma variável

    request.user = {
      // redeclarei a tipagem do express e adicionei essa informação de user, pra que todas as rotas tenham acesso ao id do usuário
      id: sub, // dizendo que o id, é igual o sub que vem do token
    };

    return next(); // permitir que o usuário continue usando a aplicação, caso o token esteja válido
  } catch (error) {
    throw new AppError('Invalid JWT token', 401);
  }
}
