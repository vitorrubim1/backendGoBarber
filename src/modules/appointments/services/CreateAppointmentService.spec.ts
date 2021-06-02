// arquivo de teste

import AppError from '@shared/errors/AppError'; // classe de erros

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository'; // fakeRepositório que representa o repositório, só que sem dependência do typeorm e do banco de dados(somente js)
import CreateAppointmentService from './CreateAppointmentService';

// sempre manter a convenção dos nomes dos teste em inglês
// todos testes devem ser lidos/descritos como se fosse uma frase, caso não entenda https://translate.google.com.br/

// variáveis global pra não repetir códigos
let fakeAppointmentsRepository: FakeAppointmentsRepository; // sem instânciar pq quero um ambiente limpo a cada teste
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  // describe: descrevo ao que será os teste nesse caso sobre a criação dos agendamentos

  // beForEach instância cada um antes de cada teste
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository(); // instancio pq o service abaixo precisa receber o repository por parâmetro, já que esse fake possui os mesmo métodos que é esperado
    createAppointment = new CreateAppointmentService( // criando o service, e recebendo o repositório fake, pra testes
      fakeAppointmentsRepository,
    );
  });

  // permitir a criação de um agendamento
  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    const appointment = await createAppointment.execute({
      date: new Date(2020, 4, 10, 13),
      provider_id: 'provider-id',
      user_id: 'user-id',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('provider-id');
  });

  // não deve permitir a criação de dois agendamentos na mesma data
  it('should not be able to create two appointments on the same date', async () => {
    const appointmentDate = new Date(2021, 6, 10, 11);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: 'provider-id',
      user_id: 'user-id',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: 'provider-id',
        user_id: 'user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  // não permitir criar agendamentos em data que já se passaram
  it('should not be able to create an appointment on a past date', async () => {
    // simulando uma data que já se passou
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 11),
        provider_id: 'provider-id',
        user_id: 'user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  // não permitir criar agendamentos com o cliente sendo o cabeleireiro
  it('should not be able to create an appointment with same user as provider', async () => {
    // simulando uma data que já se passou
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 13),
        provider_id: 'provider-id',
        user_id: 'provider-id', // pra cair no error e dar certo
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  // não permitir criar agendamentos antes das 8h e nem dps das 17h
  it('should not be able to create an appointment before 8am and after 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 6, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2021, 6, 11, 7),
        provider_id: 'user-id',
        user_id: 'provider-id',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.execute({
        date: new Date(2021, 6, 11, 18),
        provider_id: 'user-id',
        user_id: 'provider-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
