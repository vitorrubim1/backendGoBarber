// arquivo de teste

import AppError from '@shared/errors/AppError'; // classe de erros

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider'; // fakeRepositório que representa o repositório, só que sem dependência do typeorm e do banco de dados(somente js)
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'; // fakeRepositório que representa o repositório, só que sem dependência do typeorm e do banco de dados(somente js)
import UpdateUserAvatarService from './UpdateUserAvatarService';

// sempre manter a convenção dos nomes dos teste em inglês
// todos testes devem ser lidos/descritos como se fosse uma frase, caso não entenda https://translate.google.com.br/

describe('CreateUser', () => {
  // describe: descrevo ao que será os teste nesse caso sobre a criação de um user

  // permitir a atualização do avatar de um usuário
  it('should be able to update an avatar', async () => {
    const fakeUsersRepository = new FakeUsersRepository(); // instancio pq o service abaixo precisa receber o repository por parâmetro, já que esse fake possui os mesmo métodos que é esperado
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    ); // criando o service, e recebendo o repositório fake, pra testes

    // criando um user pq pra atualizar avatar preciso de um id
    const user = await fakeUsersRepository.create({
      name: 'tests ts',
      email: 'test@test.com',
      password: '12345',
    });

    await updateUserAvatar.execute({
      user_id: user.id, // id do user acima recém criado
      avatarFilename: 'avatar.jpg',
    });

    expect(user.avatar).toBe('avatar.jpg'); // como o service retorna o avatar do user atualizado, eu espero que isso seja retornado
  });

  // não permitir a atualização do avatar de um usuário inexistente
  it('should not be able to update avatar from not existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository(); // instancio pq o service abaixo precisa receber o repository por parâmetro, já que esse fake possui os mesmo métodos que é esperado
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    ); // criando o service, e recebendo o repositório fake, pra testes

    expect(
      updateUserAvatar.execute({
        user_id: 'non-existing-id', // id inexistente pra dar error
        avatarFilename: 'avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError); // como passo um id que não existe, espero erro
  });

  // permitir a exclusão de um avatar se um novo tiver sendo atualizado
  it('should be delete old avatar when updating new one', async () => {
    const fakeUsersRepository = new FakeUsersRepository(); // instancio pq o service abaixo precisa receber o repository por parâmetro, já que esse fake possui os mesmo métodos que é esperado
    const fakeStorageProvider = new FakeStorageProvider();

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile'); // spyOn: método do jest para espionar se uma função foi executada, retornando a função que quero espionar

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    ); // criando o service, e recebendo o repositório fake, pra testes

    // criando um user pq pra atualizar avatar preciso de um id
    const user = await fakeUsersRepository.create({
      name: 'tests ts',
      email: 'test@test.com',
      password: '12345',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg', // avatar antigo
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar2.jpg', // novo avatar
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg'); // espero que a função 'deleteFile' tenha sido chamada me retornando a foto antiga
    expect(user.avatar).toBe('avatar2.jpg'); // como o service retorna o avatar do user atualizado, eu espero que isso seja retornado
  });
});
