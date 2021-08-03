import { startOfHour, isBefore, getHours, format } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError'; // classe de erros

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository'; // interface com métodos não dependentes do typeorm
import Appointment from '../infra/typeorm/entities/Appointment';

interface IRequest {
  provider_id: string;
  user_id: string;
  date: Date;
}

@injectable() // digo que essa classe abaixo, é injetável, recebe injeção de dependência, através do inject()
class CreateAppointmentService {
  /*
  SOLID: D: DEPENDENCY INVERSION

  basicamente, inverteremos as obrigações, a rota que for utilizar este service precisará passar o repositório nos parâmetros,
  assim tendo que typar esse repositório com a interface IAppointmentRepository criada para substituir os métodos do typeorm
  */

  constructor(
    @inject('AppointmentsRepository') // decorator, injetando o repository de appointment
    private appointmentsRepository: IAppointmentsRepository,

    @inject('NotificationsRepository') // decorator, injetando o repository de appointment
    private notificationsRepository: INotificationsRepository,
  ) {}

  // executando a criação de um novo agendamento. : Appointment = oq preciso retornar
  public async execute({
    date,
    provider_id,
    user_id,
  }: IRequest): Promise<Appointment> {
    // Promise<>: pq a função é assíncrona

    const appointmentDate = startOfHour(date); // pra q seja agendado de hora em hora

    // não deixa criar um agendamento numa data passada
    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError("You can't create an appointment on a past date");
    }

    // não permitir a criação consigo mesmo
    if (user_id === provider_id) {
      throw new AppError("You can't create an appointment with yourself.");
    }

    // das 8hrs as 17hrs
    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new AppError(
        'You can only create appointments between 8am and 5pm.',
      );
    }

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    ); // passando pro método dentro do repository, a data formatada

    // ver se existe um agendamento com o mesmo horário
    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked'); // criando um erro, pq não temos acesso ao request, response
    }

    const appointment = await this.appointmentsRepository.create({
      // esse método só cria a instância do model
      provider_id,
      user_id,
      date: appointmentDate,
    }); // chamando o método de criação e passando os parâmetros

    const dateFormatted = format(appointmentDate, "dd/MM/yyyy 'às' HH:mm'h'");

    await this.notificationsRepository.create({
      content: `Novo agendamento para dia ${dateFormatted}`,
      recipient_id: provider_id,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
