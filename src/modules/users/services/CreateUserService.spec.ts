// arquivo de teste

import AppError from '@shared/errors/AppError'; // classe de erros

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'; // fakeRepositório que representa o repositório, só que sem dependência do typeorm e do banco de dados(somente js)
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'; // FakeHashProvider que representa o gerador de senhas criptografada, só que sem dependência do bcrypt(somente js)
import CreateUserService from './CreateUserService';

// sempre manter a convenção dos nomes dos teste em inglês
// todos testes devem ser lidos/descritos como se fosse uma frase, caso não entenda https://translate.google.com.br/

describe('CreateUser', () => {
  // describe: descrevo ao que será os teste nesse caso sobre a criação de um user

  // permitir a criação de um user
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository(); // instancio pq o service abaixo precisa receber o repository por parâmetro, já que esse fake possui os mesmo métodos que é esperado
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    ); // criando o service, e recebendo o repositório fake, pra testes

    const user = await createUser.execute({
      name: 'tests ts',
      email: 'test@test.com',
      password: '12345',
    });

    expect(user).toHaveProperty('id');
  });

  // para rejeitar caso haja dois usuários com mesmo email
  it('should not be able to create a new user with same email from another', async () => {
    const fakeUsersRepository = new FakeUsersRepository(); // instancio pq o service abaixo precisa receber o repository por parâmetro, já que esse fake possui os mesmo métodos que é esperado
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    ); // criando o service, e recebendo o repositório fake, pra testes

    await createUser.execute({
      name: 'tests ts',
      email: 'test@test.com',
      password: '12345',
    });

    await expect(
      await createUser.execute({
        name: 'tests ts',
        email: 'test@test.com',
        password: '12345',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
