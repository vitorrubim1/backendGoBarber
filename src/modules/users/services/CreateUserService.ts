import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError'; // classe de erros
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

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

    @inject('HashProvider')
    private hashProvider: IHashProvider, // criptografia e descriptografia de senha

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    // Promise<User>: metódo assíncrono que vai retornar um usuário

    // checando se já existe algum usuário com o email da request
    const checkUserExist = await this.usersRepository.findByEmail(email);

    if (checkUserExist) {
      throw new AppError('Email address already used.');
    }

    const hashedPassword = await this.hashProvider.generateHash(password); // criptografando a senha

    // criando a instância do usuário
    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    // quando um usuário é criado preciso invalidar o cache da listagem de providers
    await this.cacheProvider.invalidatePrefix('providers-list');

    return user;
  }
}

export default CreateUserService;
