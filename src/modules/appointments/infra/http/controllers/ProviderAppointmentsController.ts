import { container } from 'tsyringe';
import { Request, Response } from 'express';

import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService'; // services

export default class ProviderAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const provider_id = request.user.id; // provedor logado
    const { day, month, year } = request.body;

    const listProviderAppointments = container.resolve(
      ListProviderAppointmentsService,
    ); // toda vez que for utilizar um service instanciarei dessa forma

    const appointments = await listProviderAppointments.execute({
      provider_id,
      day,
      month,
      year,
    }); // executando a criação dentro do service

    return response.json(appointments);
  }
}
