// arquivo de teste

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'; // fakeRepositório que representa o repositório, só que sem dependência do typeorm e do banco de dados(somente js)
import ListProvidersService from './ListProvidersService';

// sempre manter a convenção dos nomes dos teste em inglês
// todos testes devem ser lidos/descritos como se fosse uma frase, caso não entenda https://translate.google.com.br/

let fakeUsersRepository: FakeUsersRepository;
let ListProviders: ListProvidersService;

// describe: descrevo ao que será os teste nesse caso sobre a criação de um user
describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository(); // instancio pq o service abaixo precisa receber o repository por parâmetro, já que esse fake possui os mesmo métodos que é esperado

    ListProviders = new ListProvidersService(fakeUsersRepository); // criando o service, e recebendo o repositório fake, pra testes
  });

  // exibir os provedores de serviços
  it('should be able to list the providers', async () => {
    // criando um user pq pra atualizar avatar preciso de um id
    const user1 = await fakeUsersRepository.create({
      name: 'John doe',
      email: 'jonh@doe.com',
      password: '12345',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'John trê',
      email: 'jonh@trê.com',
      password: '12345',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'John qua',
      email: 'jonh@qua.com',
      password: '12345',
    });

    const providers = await ListProviders.execute({
      user_id: loggedUser.id, // id do user acima recém criado
    });

    expect(providers).toEqual([user1, user2]);
  });
});
