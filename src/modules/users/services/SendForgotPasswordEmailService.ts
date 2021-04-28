import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError'; // classe de erros
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider'; // provedor de envio de emails
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

// import User from '../infra/typeorm/entities/User';

interface IRequest {
  email: string;
}

@injectable() // digo que essa classe abaixo, é injetavel, recebe injeção de dependência, através do inject()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository') // decorator, injetando o repository de users
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists');
    }

    // gerando o token
    await this.userTokensRepository.generate(user.id);

    this.mailProvider.sendMail(
      email,
      'Pedido de recuperação de senha recebido.',
    );
  }
}

export default SendForgotPasswordEmailService;
