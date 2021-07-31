import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';

export default class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body; // pra fazer o reset, é necessário o email

    // instancio a classe de autenticação e executo
    const sendForgotPasswordEmail = container.resolve(
      SendForgotPasswordEmailService,
    ); // toda vez que for utilizar um service instanciarei dessa forma

    await sendForgotPasswordEmail.execute({
      email,
    });

    // status 204: deu sucesso mas não tem retorno
    return response.status(204).json();
  }
}
