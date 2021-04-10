import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body; // dados do formulário

    const createUser = container.resolve(CreateUserService); // toda vez que for utilizar um service instanciarei dessa forma

    const user = await createUser.execute({ name, email, password }); // executando do service o metódo de criação, e passando os parametros

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
