import { Router } from 'express';

import ProfileController from '../controller/ProfileController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated'; // middleware de validação de autenticação

const profileRouter = Router();
const profileController = new ProfileController(); // desacoplo, pra conseguir usar os métodos

// middlewares

profileRouter.use(ensureAuthenticated); // rota autenticada

profileRouter.get('/', profileController.show);
profileRouter.put('/', profileController.update);

export default profileRouter;
