import { container } from 'tsyringe';
import { Request, Response } from 'express';

import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService'; // services

export default class ProviderMonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { day, month, year } = request.body;

    const listProviderDayAvailability = container.resolve(
      ListProviderDayAvailabilityService,
    ); // toda vez que for utilizar um service instanciarei dessa forma

    const availability = await listProviderDayAvailability.execute({
      provider_id,
      day,
      month,
      year,
    }); // executando a criação dentro do service

    return response.json(availability);
  }
}
