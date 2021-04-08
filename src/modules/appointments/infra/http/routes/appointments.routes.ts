import { Router } from 'express';
import { parseISO } from 'date-fns'; // isEqual: pra ver se é igual, mesma data e mesmo horário
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'; // middleware de validação de autenticação

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated); // para que todas as rotas usem a validação de autenticação

// middlewares

// appointmentsRouter.get('/', async (request, response) => {
//   const appointments = await appointmentsController.find(); // metódo de listagem dentro do controller

//   return response.json(appointments);
// });

appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  const parsedDate = parseISO(date); // transforma de string em data

  const createAppointment = container.resolve(CreateAppointmentService); // toda vez que for utilizar um service instanciarei dessa forma

  const appointment = await createAppointment.execute({
    date: parsedDate,
    provider_id,
  }); // executando a criação dentro do service

  return response.json(appointment);
});

export default appointmentsRouter;
