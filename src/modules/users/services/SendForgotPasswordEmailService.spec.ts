// arquivo de teste

// import AppError from '@shared/errors/AppError'; // classe de erros

import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'; // fakeRepositório que representa o repositório, só que sem dependência do typeorm e do banco de dados(somente js)
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

// sempre manter a convenção dos nomes dos teste em inglês
// todos testes devem ser lidos/descritos como se fosse uma frase, caso não entenda https://translate.google.com.br/

describe('SendForgotPasswordEmail', () => {
  // describe: descrevo ao que será os teste nesse caso sobre a criação de um user

  // permitir o envio de email para recuperação de senha
  it('should be able to recover the password using the email', async () => {
    const fakeUsersRepository = new FakeUsersRepository(); // instancio pq o service abaixo precisa receber o repository por parâmetro, já que esse fake possui os mesmo métodos que é esperado
    const fakeMailProvider = new FakeMailProvider(); // instancio pq o service abaixo precisa receber o repository por parâmetro, já que esse fake possui os mesmo métodos que é esperado

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail'); // spyOn: método do jest para espionar se uma função foi executada, retornando a função que quero espionar

    const sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
    ); // criando o service, e recebendo o repositório fake, pra testes

    await fakeUsersRepository.create({
      name: 'tests ts',
      email: 'test@test.com',
      password: '12345',
    });

    await sendForgotPasswordEmailService.execute({
      email: 'test@test.com',
    });

    expect(sendMail).toHaveBeenCalled(); // espero que a função tenha sido chamada
  });
});
