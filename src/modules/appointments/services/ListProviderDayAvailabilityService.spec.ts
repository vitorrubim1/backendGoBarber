// ARQUIVO DE TESTE

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

// variáveis global pra não repetir códigos
let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderDayAvailability: ListProviderDayAvailabilityService;

describe('ListProviderDayAvailability', () => {
  // beForEach instância cada um antes de cada teste
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderDayAvailability = new ListProviderDayAvailabilityService(
      fakeAppointmentsRepository,
    ); // criando o service, e recebendo o repositório fake, pra testes
  });

  it('should be able to list the day availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2021, 4, 20, 14, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2021, 4, 20, 15, 0, 0),
    });

    // verificando se um horário que já passou não está mais disponível
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 4, 20, 11).getTime(); // 11h
    });

    const availability = await listProviderDayAvailability.execute({
      provider_id: 'user',
      year: 2021,
      month: 5,
      day: 20,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false }, // já tem nesse horário então é pra dar false
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 13, available: true },
        { hour: 14, available: false },
        { hour: 15, available: false },
        { hour: 16, available: true },
      ]),
    );
    // espero que o availability seja igual a um array, arrayContaining: verá se a resposta do availability é um array contendo o que é passado dentro do paramêtro
  });
});
