import { Router } from 'express';
import multer from 'multer'; // pra lidar com upload de imagem

import uploadConfig from '../config/upload';

import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated'; // middleware de validação de autenticação

const usersRouter = Router();
const upload = multer(uploadConfig); // instanciando o multer e passando as configurações de upload

// middlewares

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body; // dados do formulário
  const createUser = new CreateUserService(); // instânciando o service

  const user = await createUser.execute({ name, email, password }); // executando do service o metódo de criação, e passando os parametros

  const userData = {
    // retornando o user sem a senha
    id: user.id,
    name: user.name,
    email: user.email,
    created_at: user.created_at,
    updated_at: user.updated_at,
  };

  return response.json(userData);
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'), // middleware responsável por criar uma única imagem, que recebe o parâmetro do "input"
  async (request, response) => {
    const updateUserAvatar = new UpdateUserAvatarService(); // instânciando a classe

    const user = await updateUserAvatar.execute({
      // passando os parâmetros que a classe espera
      user_id: request.user.id, // request.user.id: vem da declaração de tipos
      avatarFilename: request.file.filename,
    });

    const userData = {
      // retornando o user sem a senha
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };

    return response.json(userData);
  },
); // patch: pq quero atualizar uma única informação do usuário

export default usersRouter;
