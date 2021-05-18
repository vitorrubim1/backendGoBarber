import { container } from 'tsyringe';
import { Request, Response } from 'express';

import ListProvidersService from '@modules/appointments/services/ListProvidersService'; // services

// listagem de prestadores
export default class ProvidersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listProviders = container.resolve(ListProvidersService); // toda vez que for utilizar um service instanciarei dessa forma

    const providers = await listProviders.execute({
      user_id,
    }); // executando a criação dentro do service

    return response.json(providers);
  }
}
