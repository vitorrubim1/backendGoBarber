import { startOfHour } from 'date-fns';

import Appointment from '../models/Appointment';
import AppointmentsController from '../controllers/AppointmentsController';

interface RequestDTO {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  private appointmentsController: AppointmentsController;

  // o parametro que recebo é a instacia de outra classe
  constructor(appointmentsController: AppointmentsController) {
    this.appointmentsController = appointmentsController;
  }

  // executando a criação de um novo agendamento. : Appointment = oq preciso retornar
  public execute({ date, provider }: RequestDTO): Appointment {
    const appointmentDate = startOfHour(date); // pra q seja agendado de hora em hora

    const findAppointmentsInSameDate = this.appointmentsController.findByDate(
      appointmentDate,
    ); // passando pro metodo dentro do controller, a data formatada

    // ver se existe um agendemento com o mesmo horário
    if (findAppointmentsInSameDate) {
      throw Error('This appointment is already booked'); // criando um erro, pq não temos acesso ao request, response
    }

    const appointment = this.appointmentsController.create({
      provider,
      date: appointmentDate,
    }); // chamando o metódo de criação e passando os parametros

    return appointment;
  }
}

export default CreateAppointmentService;
