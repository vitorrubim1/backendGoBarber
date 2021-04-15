import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError'; // classe de erros
import IUsersRepository from '../repositories/IUsersRepository';

import User from '../infra/typeorm/entities/User';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable() // digo que essa classe abaixo, é injetavel, recebe injeção de dependência, através do inject()
class CreateUserService {
  constructor(
    @inject('UsersRepository') // decorator, injetando o repository de appointment
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    // Promise<User>: metódo assíncrono que vai retornar um usuário

    // checando se já existe algum usuário com o email da request
    const checkUserExist = await this.usersRepository.findByEmail(email);

    if (checkUserExist) {
      throw new AppError('Email address already used.');
    }

    const hashedPassword = await hash(password, 8); // criptografando a senha

    // criando a instância do usuário
    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
