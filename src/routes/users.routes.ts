import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

// middlewares

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body; // dados do formulário
    const createUser = new CreateUserService(); // instânciando o service

    const user = await createUser.execute({ name, email, password }); // executando do service o metódo de criação, e passando os parametros

    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    }; // pra não passar o password como informação

    return response.json(userWithoutPassword);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default usersRouter;
