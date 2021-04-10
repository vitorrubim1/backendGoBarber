import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateUserAvatar = container.resolve(UpdateUserAvatarService); // toda vez que for utilizar um service instanciarei dessa forma

    const user = await updateUserAvatar.execute({
      // passando os parâmetros que a classe espera
      user_id: request.user.id, // request.user.id: vem da declaração de tipos
      avatarFilename: request.file.filename,
    });

    const userData = {
      // retornando o user sem a senha
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };

    return response.json(userData);
  }
}
