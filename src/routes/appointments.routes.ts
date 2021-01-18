import { Router } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns'; // isEqual: pra ver se é igual, mesma data e mesmo horário

import Appointment from '../models/Appointment';

const appointmentsRouter = Router();

const appointments: Appointment[] = [];

// middlewares
appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));

  const findAppointmentsInSameDate = appointments.find(appointment =>
    isEqual(parsedDate, appointment.date),
  );

  // ver se existe um agendemento com o mesmo horário
  if (findAppointmentsInSameDate) {
    return response
      .status(400)
      .json({ error: 'This appointment is already booked' });
  }

  const appointment = new Appointment(provider, parsedDate); // instanciando o model e criando um novo agendamento

  appointments.push(appointment);

  return response.json(appointment);
});

export default appointmentsRouter;
