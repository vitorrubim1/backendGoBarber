import { container } from 'tsyringe';
import { Request, Response } from 'express';

import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService'; // services

export default class ProviderMonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { month, year } = request.body;

    const listProviderMonthAvailability = container.resolve(
      ListProviderMonthAvailabilityService,
    ); // toda vez que for utilizar um service instanciarei dessa forma

    const availability = await listProviderMonthAvailability.execute({
      provider_id,
      month,
      year,
    }); // executando a criação dentro do service

    return response.json(availability);
  }
}
