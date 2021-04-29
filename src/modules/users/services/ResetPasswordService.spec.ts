// arquivo de teste

import AppError from '@shared/errors/AppError'; // classe de erros

// import UserToken from '../infra/typeorm/entities/UserToken';

// fakeRepositórios que representa o repositório, só que sem dependência do typeorm e do banco de dados(somente js)
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import ResetPasswordService from './ResetPasswordService';

// sempre manter a convenção dos nomes dos teste em inglês
// todos testes devem ser lidos/descritos como se fosse uma frase, caso não entenda https://translate.google.com.br/

// variáveis global pra não repetir códigos
let fakeUsersRepository: FakeUsersRepository; // sem instânciar pq quero um ambiente limpo a cada teste
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeHashProvider: FakeHashProvider;
let resetPassword: ResetPasswordService; // o service de reset

describe('ResetPasswordService', () => {
  // describe: descrevo ao que será os teste nesse caso sobre a criação de um user

  // beForEach instância cada um antes de cada teste
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository(); // instancio pq o service abaixo precisa receber o repository por parâmetro, já que esse fake possui os mesmo métodos que é esperado
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeHashProvider = new FakeHashProvider();

    resetPassword = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeHashProvider,
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

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash'); // observo a função para ver se foi chamada

    await resetPassword.execute({
      password: '123123', // para senha q quero mudar
      token: userToken.token,
    });

    const updatedUser = await fakeUsersRepository.findById(user.id); // busco o user

    expect(generateHash).toHaveBeenCalledWith('123123');
    expect(updatedUser?.password).toBe('123123'); // espero que seja a mesma senha digitada na linha 44
  });

  // não permitir o reset da senha sem o token
  it('should not be able to reset the password with non-existing token', async () => {
    await expect(
      resetPassword.execute({
        token: 'non-existing',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  // não permitir o reset da senha sem um user válido
  it('should not be able to reset the password with non-existing user', async () => {
    const { token } = await fakeUserTokensRepository.generate(
      'non-existing-user',
    );

    await expect(
      resetPassword.execute({
        token,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  // não permitir o reset da senha dps de 2hrs
  it('should not be able to reset password if passed more than 2 hours', async () => {
    const user = await fakeUsersRepository.create({
      name: 'tests ts',
      email: 'test@test.com',
      password: '12345',
    });

    // o código após isso chamará a funcão global Date do js
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3); // adicionando mais 3h pra não passar no teste
    });

    // criando o token
    const userToken = await fakeUserTokensRepository.generate(user.id);

    await expect(
      resetPassword.execute({
        password: '123123', // para senha q quero mudar
        token: userToken.token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
