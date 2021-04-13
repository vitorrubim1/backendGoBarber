import path from 'path'; // para lidar com caminhos dentro da aplicação, de forma global
import fs from 'fs';
import { inject, injectable } from 'tsyringe';

import uploadConfig from '@config/upload'; // arquivo de configuração de upload de imagem
import AppError from '@shared/errors/AppError'; // classe de erros

import User from '../infra/typeorm/entities/User'; // representa a tabela de user
import IUsersRepository from '../repository/IUsersRepository';

/*
service responsável por adicionar uma imagem a um usuário,
por apagar uma imagem antiga caso o usuário esteja fazendo um update
somente alterar caso o usuário que esteja autenticado exista
*/

interface IRequest {
  user_id: string;
  avatarFilename: string;
}

injectable(); // digo que essa classe abaixo, é injetavel, recebe injeção de dependência, através do inject()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository') // decorator, injetando o repository de appointment
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id); // instância da entidade da tabela de usuário que tenha mesmo id que eu passo por parâmetro

    if (!user) {
      throw new AppError('Only authenticated users can change avatar', 401);
    }

    // caso o usuário exista ⬇️
    if (user.avatar) {
      // ainda não atualizamos o avatar, apenas verifico se o user já tem para apagar o avatar anterior

      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar); // uno dois caminhos com o join, e pego a imagem do user
      const userAvatarFileExist = await fs.promises.stat(userAvatarFilePath); // torno em uma promise e vejo se o arquivo de avatar do user existe

      if (userAvatarFileExist) {
        await fs.promises.unlink(userAvatarFilePath); // deleto o arquivo
      }
    }

    user.avatar = avatarFilename; // dizendo que o avatar do usuário, é o avatar do parâmetro
    await this.usersRepository.save(user); // atualizando o usuário caso exista, ou então criando caso não exista

    return user; // retornando o user
  }
}

export default UpdateUserAvatarService;