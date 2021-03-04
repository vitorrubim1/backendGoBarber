import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm'; // getCustomRepository: função pra buscar um controller

import Appointment from '../models/Appointment';
import AppointmentsController from '../controllers/AppointmentsController';

interface RequestDTO {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  // executando a criação de um novo agendamento. : Appointment = oq preciso retornar
  public async execute({ date, provider }: RequestDTO): Promise<Appointment> {
    // Promise<>: pq a função é assincrona
    const appointmentsController = getCustomRepository(AppointmentsController);

    const appointmentDate = startOfHour(date); // pra q seja agendado de hora em hora

    const findAppointmentsInSameDate = await appointmentsController.findByDate(
      appointmentDate,
    ); // passando pro metodo dentro do controller, a data formatada

    // ver se existe um agendemento com o mesmo horário
    if (findAppointmentsInSameDate) {
      throw Error('This appointment is already booked'); // criando um erro, pq não temos acesso ao request, response
    }

    const appointment = appointmentsController.create({
      // esse metódo só cria a instância do model
      provider,
      date: appointmentDate,
    }); // chamando o metódo de criação e passando os parametros

    await appointmentsController.save(appointment); // salvando no banco de dados

    return appointment;
  }
}

export default CreateAppointmentService;
