import { hash } from 'bcryptjs';

import AppError from '@shared/errors/AppError'; // classe de erros
import IUsersController from '../controllers/IUsersController';

import User from '../infra/typeorm/entities/User';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  constructor(private usersRepository: IUsersController) {}

  public async execute({ email, name, password }: IRequest): Promise<User> {
    // Promise<User>: metódo assíncrono que vai retornar um usuário

    // checando se já existe algum usuário com o email da request
    const checkUserExist = await this.usersRepository.findByEmail(email);

    if (checkUserExist) {
      throw new AppError('Email address already used another user.');
    }

    const hashedPassword = await hash(password, 8); // criptografando a senha

    // criando a instância do usuário
    const user = await this.usersRepository.create({
      email,
      name,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
