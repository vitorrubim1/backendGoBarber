import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';

// iat: Quando token foi gerado. exp: Quando irá expirar. sub: nesse caso é o id do user, que será usado pra listar agendamentos...
interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

// Middleware responsável por verificar se o usuário está realmente autenticado
export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  // next será responsável por prosseguir para as outras rotas, se ele não for chamado quer dizer que user não está autenticado

  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    // Verificando se o token é válido
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub } = decoded as ITokenPayload;

    // Redeclarei a tipagem do express e adicionei essa informação de user, pra que todas as rotas tenham acesso ao id do usuário
    request.user = {
      id: sub,
    };

    return next();
  } catch (error) {
    throw new AppError('Invalid JWT token', 401);
  }
}
