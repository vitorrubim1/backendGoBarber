import { inject, injectable } from 'tsyringe';
import path from 'path';

import AppError from '@shared/errors/AppError'; // classe de erros
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider'; // provedor de envio de emails
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

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
    const { token } = await this.userTokensRepository.generate(user.id);

    // caminho pro arquivo de template
    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );

    await this.mailProvider.sendMail({
      to: { name: user.name, email: user.email },
      subject: '[GoBarber] Recuperação de senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`,
        }, // essa variável preenche a variável do template
      },
    });
  }
}

export default SendForgotPasswordEmailService;
