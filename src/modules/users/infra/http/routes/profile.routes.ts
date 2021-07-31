import { Router } from 'express';

import ProfileController from '../controllers/ProfileController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated'; // middleware de validação de autenticação

// desacoplo, pra conseguir usar os métodos
const profileRouter = Router();
const profileController = new ProfileController();

// middlewares
profileRouter.use(ensureAuthenticated); // rota autenticada

profileRouter.get('/', profileController.show);
profileRouter.put('/', profileController.update);

export default profileRouter;
