import { Router } from 'express';

import SessionsController from '../controllers/SessionsController';

const sessionsRouter = Router();
const sessionsController = new SessionsController(); // desacoplo, pra conseguir usar os métodos

// rota de autenticação
sessionsRouter.post('/', sessionsController.create);

export default sessionsRouter;
