import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm'; // getCustomRepository: função pra buscar um controller

import AppError from '../errors/AppError'; // classe de erros

import Appointment from '../models/Appointment';
import AppointmentsController from '../controllers/AppointmentsController';

interface RequestDTO {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  // executando a criação de um novo agendamento. : Appointment = oq preciso retornar
  public async execute({
    date,
    provider_id,
  }: RequestDTO): Promise<Appointment> {
    // Promise<>: pq a função é assincrona
    const appointmentsRepository = getCustomRepository(AppointmentsController);

    const appointmentDate = startOfHour(date); // pra q seja agendado de hora em hora

    const findAppointmentsInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    ); // passando pro metodo dentro do controller, a data formatada

    // ver se existe um agendemento com o mesmo horário
    if (findAppointmentsInSameDate) {
      throw new AppError('This appointment is already booked'); // criando um erro, pq não temos acesso ao request, response
    }

    const appointment = appointmentsRepository.create({
      // esse metódo só cria a instância do model
      provider_id,
      date: appointmentDate,
    }); // chamando o metódo de criação e passando os parametros

    await appointmentsRepository.save(appointment); // salvando no banco de dados

    return appointment;
  }
}

export default CreateAppointmentService;
