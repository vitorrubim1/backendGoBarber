import { parseISO } from 'date-fns'; // isEqual: pra ver se é igual, mesma data e mesmo horário
import { container } from 'tsyringe';
import { Request, Response } from 'express';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService'; // services

export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date); // transforma de string em data

    const createAppointment = container.resolve(CreateAppointmentService); // toda vez que for utilizar um service instanciarei dessa forma

    const appointment = await createAppointment.execute({
      date: parsedDate,
      provider_id,
    }); // executando a criação dentro do service

    return response.json(appointment);
  }
}
