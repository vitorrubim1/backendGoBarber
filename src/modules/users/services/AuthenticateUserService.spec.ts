// arquivo de teste

import AppError from '@shared/errors/AppError'; // classe de erros

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'; // fakeRepositório que representa o repositório, só que sem dependência do typeorm e do banco de dados(somente js)
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'; // FakeHashProvider que representa o gerador de senhas criptografada, só que sem dependência do bcrypt(somente js)

import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

// sempre manter a convenção dos nomes dos teste em inglês
// todos testes devem ser lidos/descritos como se fosse uma frase, caso não entenda https://translate.google.com.br/

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserService;
let createUserService: CreateUserService;

// describe: descrevo ao que será os teste nesse caso sobre a criação de um user
describe('AuthenticateUser', () => {
  // beForEach instância cada um antes de cada teste
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository(); // instancio pq o service abaixo precisa receber o repository por parâmetro, já que esse fake possui os mesmo métodos que é esperado
    fakeHashProvider = new FakeHashProvider();

    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    ); // criando o service, e recebendo o repositório fake, pra testes

    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    ); // criando o service de criação de um user pq um teste não pode depender de outro teste, então esse aq terá a criação e autenticação
  });

  // permitir a autenticação de um user
  it('should be able to authenticate', async () => {
    const user = await createUserService.execute({
      name: 'tests ts',
      email: 'test@test.com',
      password: '12345',
    });

    const response = await authenticateUser.execute({
      email: 'test@test.com',
      password: '12345',
    });

    expect(response).toHaveProperty('token'); // espero que a resposta da autenticação me retorne um token
    expect(response.user).toEqual(user); // espero que a resposta da autenticação me retorne um user igual ao que foi criado no teste
  });

  // não permitir a autenticação de um usuário que não exista
  it('should not be able to authenticate with non existing user', async () => {
    await expect(
      authenticateUser.execute({
        email: 'test@test.com',
        password: '12345',
      }),
    ).rejects.toBeInstanceOf(AppError); // passando um user que não existe, e espero que de um erro
  });

  // não permitir a autenticação de um user que tenha email/password errado
  it('should not be able to authenticate with wrong password', async () => {
    await createUserService.execute({
      name: 'tests ts',
      email: 'test@test.com',
      password: '12345',
    });

    await expect(
      authenticateUser.execute({
        email: 'test@test.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError); // espero que rejeite, que passo o password errado
  });
});
