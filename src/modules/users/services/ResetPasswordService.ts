import { inject, injectable } from 'tsyringe';
import { isAfter, addHours } from 'date-fns';

import AppError from '@shared/errors/AppError'; // classe de erros
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

// import User from '../infra/typeorm/entities/User';

interface IRequest {
  password: string;
  token: string;
}

@injectable() // digo que essa classe abaixo, é injetavel, recebe injeção de dependência, através do inject()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository') // decorator, injetando o repository de users
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ password, token }: IRequest): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User token does not exists');
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User does not exists');
    }

    const tokenCreatedAt = userToken.created_at; // hora de criação do token
    const compareDate = addHours(tokenCreatedAt, 2); // adicionando 2h a hora de criação do token

    if (isAfter(Date.now(), compareDate)) {
      // se a hora atual for maior q data de criação do token + 2
      throw new AppError('Token expired');
    }

    user.password = await this.hashProvider.generateHash(password); // nova senha criptografada

    await this.usersRepository.save(user);
  }
}

export default ResetPasswordService;