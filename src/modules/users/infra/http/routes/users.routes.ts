import { Router } from 'express';
import multer from 'multer'; // pra lidar com upload de imagem

import uploadConfig from '@config/upload';

import ensureAuthenticated from '../middlewares/ensureAuthenticated'; // middleware de validação de autenticação

import UsersController from '../controller/UsersController';
import UserAvatarController from '../controller/UserAvatarController';

const usersRouter = Router();
const usersController = new UsersController(); // desacoplo, pra conseguir usar os métodos
const userAvatarController = new UserAvatarController(); // desacoplo, pra conseguir usa o método de atualizar avatar, em controller diferente pq é relacionado somente ao avatar, e não poderia ser dentro do update do user pq, o método update já é pro user em si, senha, email ...
const upload = multer(uploadConfig); // instanciando o multer e passando as configurações de upload

// middlewares

usersRouter.post('/', usersController.create);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'), // middleware responsável por criar uma única imagem, que recebe o parâmetro do "input"
  userAvatarController.update,
); // patch: pq quero atualizar uma única informação do usuário

export default usersRouter;
