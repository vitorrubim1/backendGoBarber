// arquivo de teste

import AppError from '@shared/errors/AppError'; // classe de erros

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository'; // fakeRepositório que representa o repositório, só que sem dependência do typeorm e do banco de dados(somente js)
import CreateAppointmentService from './CreateAppointmentService';

// sempre manter a convenção dos nomes dos teste em inglês
// todos testes devem ser lidos/descritos como se fosse uma frase, caso não entenda https://translate.google.com.br/

// variáveis global pra não repetir códigos
let fakeAppointmentsRepository: FakeAppointmentsRepository; // sem instânciar pq quero um ambiente limpo a cada teste
let createAppointmentService: CreateAppointmentService;

describe('CreateAppointment', () => {
  // describe: descrevo ao que será os teste nesse caso sobre a criação dos agendamentos

  // beForEach instância cada um antes de cada teste
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository(); // instancio pq o service abaixo precisa receber o repository por parâmetro, já que esse fake possui os mesmo métodos que é esperado
    createAppointmentService = new CreateAppointmentService( // criando o service, e recebendo o repositório fake, pra testes
      fakeAppointmentsRepository,
    );
  });

  // permitir a criação de um agendamento
  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointmentService.execute({
      date: new Date(),
      provider_id: '123123',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123123');
  });

  // não deve permitir a criação de dois agendamentos na mesma data
  it('should not be able to create two appointments on the same date', async () => {
    const appointmentDate = new Date(2021, 1, 10, 11);

    await createAppointmentService.execute({
      date: appointmentDate,
      provider_id: '123123',
    });

    await expect(
      createAppointmentService.execute({
        date: appointmentDate,
        provider_id: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
