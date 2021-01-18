import { Router } from 'express';
import { parseISO } from 'date-fns'; // isEqual: pra ver se é igual, mesma data e mesmo horário

import AppoinmentsController from '../controllers/AppointmentsController';
import CreateAppointmentService from '../services/CreateAppointmentsServices';

const appointmentsRouter = Router();
const appointmentsController = new AppoinmentsController(); // instanciando a classe

// middlewares

appointmentsRouter.get('/', (request, response) => {
  const appointments = appointmentsController.all(); // metódo de listagem dentro do controller

  return response.json(appointments);
});

appointmentsRouter.post('/', (request, response) => {
  try {
    const { provider, date } = request.body;

    const parsedDate = parseISO(date); // transforma de string em data

    const createAppointment = new CreateAppointmentService(
      appointmentsController, // passando o controller, já que o service espera
    );

    const appointment = createAppointment.execute({
      date: parsedDate,
      provider,
    }); // executando a criação dentro do service

    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default appointmentsRouter;
