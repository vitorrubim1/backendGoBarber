import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'; // middleware de validação de autenticação
import ProvidersController from '../controllers/ProvidersController';

const providersRouter = Router();
const providersController = new ProvidersController(); // desacoplo, pra conseguir usar os métodos

providersRouter.use(ensureAuthenticated); // para que todas as rotas usem a validação de autenticação

// middleware

providersRouter.get('/', providersController.index);

export default providersRouter;
