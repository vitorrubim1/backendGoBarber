// arquivo de teste

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

// sempre manter a convenção dos nomes dos teste em inglês
// todos testes devem ser lidos/descritos como se fosse uma frase, caso não entenda https://translate.google.com.br/

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderDayAvailabilityService: ListProviderDayAvailabilityService;

// describe: descrevo ao que será os teste nesse caso sobre a criação de um user
describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderDayAvailabilityService = new ListProviderDayAvailabilityService(
      fakeAppointmentsRepository,
    ); // criando o service, e recebendo o repositório fake, pra testes
  });

  // exibir os dias disponives de um provedor
  it('should be able to list the day availability from provider', async () => {
    // criando agendamentos
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2021, 4, 20, 8, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2021, 4, 20, 10, 0, 0),
    });

    const availability = await listProviderDayAvailabilityService.execute({
      provider_id: 'user',
      day: 20,
      month: 5,
      year: 2021,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false }, // já tem nesse horário então é pra dar false
        { hour: 9, available: true }, // não tem então é true
        { hour: 10, available: false },
        { hour: 11, available: true },
      ]),
    );
    // espero que o availability seja igual a um array, arrayContaining: verá se a resposta do availability é um array contendo o que é passado dentro do paramêtro
  });
});
