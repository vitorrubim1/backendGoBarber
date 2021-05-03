import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ResetPasswordService from '@modules/users/services/ResetPasswordService';

export default class ResetPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { password, token } = request.body; // pra fazer o reset, é necessário password que vem do email e o token do user em si

    // instancio a classe de autenticação e executo
    const resetPassword = container.resolve(ResetPasswordService); // toda vez que for utilizar um service instanciarei dessa forma

    await resetPassword.execute({
      password,
      token,
    });

    // status 204: deu sucesso mas não tem retorno
    return response.status(204).json();
  }
}
