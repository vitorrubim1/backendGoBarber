import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate'; // middleware de validação das informações da rota

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'; // middleware de validação de autenticação
import AppointmentsController from '../controllers/AppointmentsController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

// desacoplo, pra conseguir usar os métodos
const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();

appointmentsRouter.use(ensureAuthenticated); // para que todas as rotas usem a validação de autenticação

// middlewares
appointmentsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      provider_id: Joi.string().uuid().required(),
      date: Joi.date(),
    },
  }),
  appointmentsController.create,
);
appointmentsRouter.get('/me', providerAppointmentsController.index);

export default appointmentsRouter;
