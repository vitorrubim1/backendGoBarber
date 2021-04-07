import { Router } from 'express';

import UsersController from '@modules/users/infra/typeorm/controller/UsersController';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

const sessionsRouter = Router();

// rota de autenticação

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body; // pra fazer autenticação, é necessário email e senha

  // instancio a classe de autenticação e executo
  const usersController = new UsersController();
  const authenticateUserService = new AuthenticateUserService(usersController);

  const { user, token } = await authenticateUserService.execute({
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
});

export default sessionsRouter;
