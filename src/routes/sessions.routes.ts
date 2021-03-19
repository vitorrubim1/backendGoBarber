import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

// rota de autenticação

sessionsRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body; // pra fazer autenticação, é necessário email e senha

    // instancio a classe de autenticação e executo
    const authenticateUserService = new AuthenticateUserService();
    const { user } = await authenticateUserService.execute({
      email,
      password,
    }); // desacoplei a resposta da classe pra ficar mais semântico e saber oq estou retornando para o frontend

    const sessionsWithoutPassword = {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };

    return response.json({ sessionsWithoutPassword });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default sessionsRouter;
