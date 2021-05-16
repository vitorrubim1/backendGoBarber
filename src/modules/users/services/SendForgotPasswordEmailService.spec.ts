// arquivo de teste

import AppError from '@shared/errors/AppError'; // classe de erros

// fakeRepositórios que representa o repositório, só que sem dependência do typeorm e do banco de dados(somente js)
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

// sempre manter a convenção dos nomes dos teste em inglês
// todos testes devem ser lidos/descritos como se fosse uma frase, caso não entenda https://translate.google.com.br/

// variáveis global pra não repetir códigos
let fakeUsersRepository: FakeUsersRepository; // sem instânciar pq quero um ambiente limpo a cada teste
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeMailProvider: FakeMailProvider;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  // describe: descrevo ao que será os teste nesse caso sobre a criação de um user

  // beForEach instância cada um antes de cada teste
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository(); // instancio pq o service abaixo precisa receber o repository por parâmetro, já que esse fake possui os mesmo métodos que é esperado
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository,
    ); //
  });

  // permitir o envio de email para recuperação de senha
  it('should be able to recover the password using the email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail'); // spyOn: método do jest para espionar se uma função foi executada, retornando a função que quero espionar

    await fakeUsersRepository.create({
      name: 'tests ts',
      email: 'test@test.com',
      password: '12345',
    });

    await sendForgotPasswordEmail.execute({
      email: 'test@test.com',
    });

    await expect(sendMail).toHaveBeenCalled(); // espero que a função tenha sido chamada
  });

  // não permitir que um usuário inexistente recupere a senha
  it('should not be able to recover a non-existing user password', async () => {
    // criando o service, e recebendo o repositório fake, pra testes
    await expect(
      sendForgotPasswordEmail.execute({
        email: 'test@test.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  // saber se pra uma recuperação de senha foi gerado um toke
  it('should generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate'); // spyOn: método do jest para espionar se uma função foi executada, retornando a função que quero espionar
    const user = await fakeUsersRepository.create({
      name: 'tests ts',
      email: 'test@test.com',
      password: '12345',
    });

    await sendForgotPasswordEmail.execute({
      email: 'test@test.com',
    });

    await expect(generateToken).toHaveBeenCalledWith(user.id); // espero que a função tenha sido chamada passando o id do user
  });
});
