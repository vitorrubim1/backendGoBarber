import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns'; // isEqual: pra ver se é igual, mesma data e mesmo horário

import AppointmentsController from '../controllers/AppointmentsController';
import CreateAppointmentService from '../services/CreateAppointmentsServices';

const appointmentsRouter = Router();

// middlewares

appointmentsRouter.get('/', async (request, response) => {
  const appointmentsController = getCustomRepository(AppointmentsController);
  const appointments = await appointmentsController.find(); // metódo de listagem dentro do controller

  return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
  try {
    const { provider, date } = request.body;

    const parsedDate = parseISO(date); // transforma de string em data

    const createAppointment = new CreateAppointmentService();

    const appointment = await createAppointment.execute({
      date: parsedDate,
      provider,
    }); // executando a criação dentro do service

    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default appointmentsRouter;
