import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'; // middleware de validação de autenticação
import AppointmentsController from '../controllers/AppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController(); // desacoplo, pra conseguir usar os métodos

appointmentsRouter.use(ensureAuthenticated); // para que todas as rotas usem a validação de autenticação

// middlewares

// appointmentsRouter.get('/', async (request, response) => {
//   const appointments = await appointmentsController.find(); // método de listagem dentro do repository

//   return response.json(appointments);
// });

appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
