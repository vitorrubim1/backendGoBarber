import { startOfHour } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError'; // classe de erros

import IAppointmentRepository from '../repositories/IAppointmentRepository'; // interface com métodos não dependentes do typeorm

import Appointment from '../infra/typeorm/entities/Appointment';

interface IRequest {
  provider_id: string;
  user_id: string;
  date: Date;
}

@injectable() // digo que essa classe abaixo, é injetavel, recebe injeção de dependência, através do inject()
class CreateAppointmentService {
  // SOLID: D: DEPENDENCY INVERSION
  /*
  basicamente, inverteremos as obrigações, a rota que for utilizar este service precisará passar o repositório nos parâmetros,
  assim tendo que tipar esse repositório com a interface IAppointmentRepository criada para substituir os métodos do typeorm
  */

  constructor(
    @inject('AppointmentsRepository') // decorator, injetando o repository de appointment
    private appointmentsRepository: IAppointmentRepository,
  ) {}

  // executando a criação de um novo agendamento. : Appointment = oq preciso retornar
  public async execute({
    date,
    provider_id,
    user_id,
  }: IRequest): Promise<Appointment> {
    // Promise<>: pq a função é assincrona

    const appointmentDate = startOfHour(date); // pra q seja agendado de hora em hora

    const findAppointmentsInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    ); // passando pro metodo dentro do repository, a data formatada

    // ver se existe um agendemento com o mesmo horário
    if (findAppointmentsInSameDate) {
      throw new AppError('This appointment is already booked'); // criando um erro, pq não temos acesso ao request, response
    }

    const appointment = await this.appointmentsRepository.create({
      // esse metódo só cria a instância do model
      provider_id,
      user_id,
      date: appointmentDate,
    }); // chamando o metódo de criação e passando os parametros

    return appointment;
  }
}

export default CreateAppointmentService;
