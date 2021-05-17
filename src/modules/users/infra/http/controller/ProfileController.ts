import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    // exibição do perfil

    const user_id = request.user.id;

    const showProfile = container.resolve(ShowProfileService); // toda vez que for utilizar um service instanciarei dessa forma

    const user = await showProfile.execute({ user_id });

    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };

    return response.json(userData);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { name, email, old_password, password } = request.body; // dados do formulário

    const updateProfile = container.resolve(UpdateProfileService); // toda vez que for utilizar um service instanciarei dessa forma

    const user = await updateProfile.execute({
      user_id,
      name,
      email,
      old_password,
      password,
    }); // executando do service o método de criação, e passando os parâmetros

    const userData = {
      // retornando o user sem a senha
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };

    return response.json(userData);
  }
}
