// arquivo de teste

import AppError from '@shared/errors/AppError'; // classe de erros

import UserToken from '../infra/typeorm/entities/UserToken';

// fakeRepositórios que representa o repositório, só que sem dependência do typeorm e do banco de dados(somente js)
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import ResetPasswordService from './ResetPasswordService';

// sempre manter a convenção dos nomes dos teste em inglês
// todos testes devem ser lidos/descritos como se fosse uma frase, caso não entenda https://translate.google.com.br/

// variáveis global pra não repetir códigos
let fakeUsersRepository: FakeUsersRepository; // sem instânciar pq quero um ambiente limpo a cada teste
let fakeUserTokensRepository: FakeUserTokensRepository;
let resetPassword: ResetPasswordService;

describe('SendForgotPasswordEmail', () => {
  // describe: descrevo ao que será os teste nesse caso sobre a criação de um user

  // beForEach instância cada um antes de cada teste
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository(); // instancio pq o service abaixo precisa receber o repository por parâmetro, já que esse fake possui os mesmo métodos que é esperado
    fakeUserTokensRepository = new FakeUserTokensRepository();

    resetPassword = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
    ); //
  });

  // permitir o reset da senha
  it('should be able to reset the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'tests ts',
      email: 'test@test.com',
      password: '12345',
    });

    // criando o token
    const userToken = await fakeUserTokensRepository.generate(user.id);

    await resetPassword.execute({
      password: '123123', // para senha q quero mudar
      token: userToken.token,
    });

    const updatedUser = await fakeUsersRepository.findById(user.id); // busco o user

    expect(updatedUser?.password).toBe('123123'); // espero que seja a mesma senha digitada na linha 44
  });
});
