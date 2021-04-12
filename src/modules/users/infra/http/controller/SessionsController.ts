import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body; // pra fazer autenticação, é necessário email e senha

    // instancio a classe de autenticação e executo
    const authenticateUser = container.resolve(AuthenticateUserService); // toda vez que for utilizar um service instanciarei dessa forma
    const { user, token } = await authenticateUser.execute({
      email,
      password,
    }); // desacoplei a resposta da classe pra ficar mais semântico e saber oq estou retornando para o frontend

    const userData = {
      // retornando o user sem a senha
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };

    return response.json({ userData, token });
  }
}
