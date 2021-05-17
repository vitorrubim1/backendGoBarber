import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError'; // classe de erros

import User from '../infra/typeorm/entities/User'; // representa a tabela do user
import IUsersRepository from '../repositories/IUsersRepository';

/*
service responsável por adicionar uma imagem a um usuário,
por apagar uma imagem antiga caso o usuário esteja fazendo um update
somente alterar caso o usuário que esteja autenticado exista
*/

interface IRequest {
  user_id: string;
}

@injectable() // digo que essa classe abaixo, é injetavel, recebe injeção de dependência, através do inject()
class ShowProfileService {
  constructor(
    @inject('UsersRepository') // decorator, injetando o repository de users
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.');
    }

    return user;
  }
}

export default ShowProfileService;
