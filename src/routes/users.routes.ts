import { Router } from 'express';

import CreateUserService from '../services/CreateUserServices';

const usersRouter = Router();

// middlewares

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body; // dados do formulário
    const createUser = new CreateUserService(); // instânciando o service

    const user = await createUser.execute({ name, email, password }); // executando do service o metódo de criação, e passando os parametros

    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default usersRouter;
