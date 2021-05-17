// arquivo de teste

import AppError from '@shared/errors/AppError'; // classe de erros

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'; // fakeRepositório que representa o repositório, só que sem dependência do typeorm e do banco de dados(somente js)
import ShowProfileService from './ShowProfileService';

// sempre manter a convenção dos nomes dos teste em inglês
// todos testes devem ser lidos/descritos como se fosse uma frase, caso não entenda https://translate.google.com.br/

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

// describe: descrevo ao que será os teste nesse caso sobre a criação de um user
describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository(); // instancio pq o service abaixo precisa receber o repository por parâmetro, já que esse fake possui os mesmo métodos que é esperado

    showProfile = new ShowProfileService(fakeUsersRepository); // criando o service, e recebendo o repositório fake, pra testes
  });

  // exibir o perfil do usuário
  it('should be able to show the profile', async () => {
    // criando um user pq pra atualizar avatar preciso de um id
    const user = await fakeUsersRepository.create({
      name: 'Vitor Rubim',
      email: 'vitor@gmail.com',
      password: '12345',
    });

    const profile = await showProfile.execute({
      user_id: user.id, // id do user acima recém criado
    });

    await expect(profile.name).toBe('Vitor Rubim'); // como o service retorna o avatar do user atualizado, eu espero que isso seja retornado
    await expect(profile.email).toBe('vitor@gmail.com');
  });

  // não exibir o perfil do usuário caso não exista
  it('should not be able to show the profile from non-existing user', async () => {
    expect(
      showProfile.execute({
        user_id: 'non-existing-user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
