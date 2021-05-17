// arquivo de teste

import AppError from '@shared/errors/AppError'; // classe de erros

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'; // fakeRepositório que representa o repositório, só que sem dependência do typeorm e do banco de dados(somente js)
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'; // fakeRepositório que representa o repositório, só que sem dependência do typeorm e do banco de dados(somente js)
import UpdateProfileService from './UpdateProfileService';

// sempre manter a convenção dos nomes dos teste em inglês
// todos testes devem ser lidos/descritos como se fosse uma frase, caso não entenda https://translate.google.com.br/

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

// describe: descrevo ao que será os teste nesse caso sobre a criação de um user
describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository(); // instancio pq o service abaixo precisa receber o repository por parâmetro, já que esse fake possui os mesmo métodos que é esperado
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    ); // criando o service, e recebendo o repositório fake, pra testes
  });

  // permitir a atualização do name e email
  it('should be able to update the profile', async () => {
    // criando um user pq pra atualizar avatar preciso de um id
    const user = await fakeUsersRepository.create({
      name: 'tests ts',
      email: 'test@test.com',
      password: '12345',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id, // id do user acima recém criado
      name: 'Updated user',
      email: 'upadated@user.com',
    });

    await expect(updatedUser.name).toBe('Updated user'); // como o service retorna o avatar do user atualizado, eu espero que isso seja retornado
    await expect(updatedUser.email).toBe('upadated@user.com');
  });

  it('should not be able to update the email to the existing email', async () => {
    await fakeUsersRepository.create({
      name: 'Vitor Rubim',
      email: 'vitor@gmail.com',
      password: '12345',
    });

    // usuário que vai receber a atualização
    const user = await fakeUsersRepository.create({
      name: 'test',
      email: 'test@gmail.com',
      password: '12345',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id, // id do user acima recém criado
        name: 'Vitor Rubim',
        email: 'vitor@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  // permitir a atualização da senha
  it('should be able to update the password', async () => {
    // criando um user pq pra atualizar avatar preciso de um id
    const user = await fakeUsersRepository.create({
      name: 'tests ts',
      email: 'test@test.com',
      password: '12345',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id, // id do user acima recém criado
      name: 'Updated user',
      email: 'upadated@user.com',
      old_password: '12345',
      password: '123123',
    });

    await expect(updatedUser.password).toBe('123123'); // como o service retorna o avatar do user atualizado, eu espero que isso seja retornado
  });

  // não permitir a atualização da senha sem a senha antiga
  it('should not be able to update the password without old password', async () => {
    // criando um user pq pra atualizar avatar preciso de um id
    const user = await fakeUsersRepository.create({
      name: 'tests ts',
      email: 'test@test.com',
      password: '12345',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id, // id do user acima recém criado
        name: 'Updated user',
        email: 'upadated@user.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  // não permitir a atualização da senha com senha antiga errada
  it('should not be able to update the password with wrong old password', async () => {
    // criando um user pq pra atualizar avatar preciso de um id
    const user = await fakeUsersRepository.create({
      name: 'tests ts',
      email: 'test@test.com',
      password: '12345',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id, // id do user acima recém criado
        name: 'Updated user',
        email: 'upadated@user.com',
        old_password: 'wrong_old_password',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
