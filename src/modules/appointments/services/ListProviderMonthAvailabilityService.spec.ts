// arquivo de teste

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

// sempre manter a convenção dos nomes dos teste em inglês
// todos testes devem ser lidos/descritos como se fosse uma frase, caso não entenda https://translate.google.com.br/

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailability: ListProviderMonthAvailabilityService;

// describe: descrevo ao que será os teste nesse caso sobre a criação de um user
describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository,
    ); // criando o service, e recebendo o repositório fake, pra testes
  });

  // exibir os meses disponives de um provedor
  it('should be able to list the month availability from provider', async () => {
    // criando uns agendamentos
    fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 3, 20, 8, 0, 0), // 3 = abril, começando do 0
    });

    fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 8, 0, 0), // 4 = maio, começando do 0
    });

    fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 10, 0, 0),
    });

    fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 21, 10, 0, 0),
    });

    const availability = await listProviderMonthAvailability.execute({
      provider_id: 'user',
      month: 5,
      year: 2020,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 19, availability: true }, // nada agendado
        { day: 20, availability: false }, // fiz agendamento ali em cima
        { day: 21, availability: false }, // fiz agendamento ali em cima
        { day: 22, availability: true }, // nada agendado
      ]),
    );
    // espero que o availability seja igual a um array, arrayContaining: verá se a resposta do availability é um array contendo o que é passado dentro do paramêtro
  });
});
