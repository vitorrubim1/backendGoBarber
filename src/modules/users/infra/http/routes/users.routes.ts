import { Router } from 'express';
import multer from 'multer'; // pra lidar com upload de imagem
import { celebrate, Joi, Segments } from 'celebrate';

import uploadConfig from '@config/upload';

import ensureAuthenticated from '../middlewares/ensureAuthenticated'; // middleware de validação de autenticação

import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

// desacoplo, pra conseguir usar os métodos
const usersRouter = Router();
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();
const upload = multer(uploadConfig); // instanciando o multer e passando as configurações de upload

// middlewares
usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'), // middleware responsável por criar uma única imagem, que recebe o parâmetro do "input"
  userAvatarController.update,
); // patch: pq quero atualizar uma única informação do usuário

export default usersRouter;
