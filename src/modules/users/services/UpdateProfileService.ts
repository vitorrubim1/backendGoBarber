import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError'; // classe de erros

import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';

import User from '../infra/typeorm/entities/User'; // representa a tabela de user

/*
service responsável por adicionar uma imagem a um usuário,
por apagar uma imagem antiga caso o usuário esteja fazendo um update
somente alterar caso o usuário que esteja autenticado exista
*/

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  old_password?: string;
  password?: string;
}

injectable(); // digo que essa classe abaixo, é injetavel, recebe injeção de dependência, através do inject()
class UpdateProfile {
  constructor(
    @inject('UsersRepository') // decorator, injetando o repository de users
    private usersRepository: IUsersRepository,

    @inject('HashProvider') // decorator, injetando o repository de appointment
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.');
    }

    const userWithUpdatedEmail = await this.usersRepository.findByEmail(email);

    // verificando se o email que será atualizado é diferente de algum outro cadastrado
    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError('Email already in use.');
    }

    user.name = name;
    user.email = email;

    if (password && !old_password) {
      throw new AppError(
        'You need to inform the old password to set a new password',
      );
    }

    if (password && old_password) {
      // verificando se a antiga senha informada está correta
      const checkOldPassword = await this.hashProvider.compareHash(
        old_password,
        user.password,
      );

      if (!checkOldPassword) {
        throw new AppError('Old password does not match');
      }

      user.password = await this.hashProvider.generateHash(password);
    }

    return this.usersRepository.save(user);
  }
}

export default UpdateProfile;
