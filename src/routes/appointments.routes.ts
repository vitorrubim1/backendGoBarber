import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns'; // isEqual: pra ver se é igual, mesma data e mesmo horário

import AppoinmentsController from '../controllers/AppointmentsController';

const appointmentsRouter = Router();
const appoinmentsController = new AppoinmentsController(); // instanciando a classe

// middlewares
appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));

  const findAppointmentsInSameDate = appoinmentsController.findByDate(
    parsedDate,
  ); // passando pro metodo dentro do controller, a data formatada

  // ver se existe um agendemento com o mesmo horário
  if (findAppointmentsInSameDate) {
    return response
      .status(400)
      .json({ error: 'This appointment is already booked' });
  }

  const appointment = appoinmentsController.create(provider, parsedDate); // chamando o metódo de criação e passando os parametros

  return response.json(appointment);
});

export default appointmentsRouter;
