import { v4 as uuid } from 'uuid';
import { isEqual } from 'date-fns';

import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository'; // interface responsável pelos métodos de retorno
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO'; // métodos da aplicação

import Appointment from '../../infra/typeorm/entities/Appointment';

// arquivo fake, sem nenhuma dependência do typeorm para ajudar nos teste, com métodos somente com javascript

class AppointmentsRepository implements IAppointmentRepository {
  /*
   <Appointment>: tipagem da classe, que é o model e a representação da tabela do bd
   implements: que será os métodos que esse arquivo deverá retornar
  */

  // vamos criar na mão, já que não teremos dependência do bd e nem do typeorm
  private appointments: Appointment[] = []; // array de appointments

  // MÉTODO PARA ENCONTRAR UM AGENDAMENTO PELA MESMA DATA
  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(appointment.date, date),
    ); // percorrendo a variável da linha 17 para encontrar um appointment que tenha a mesma data

    return findAppointment;
  }

  // MÉTODO PARA CRIAÇÃO DE UM APPOINTMENT E PRA SALVAR NO BD
  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment(); // desacoplando informações do model da variável

    Object.assign(appointment, { id: uuid(), date, provider_id }); // jogando tudo de dentro do objeto no "appointment"

    this.appointments.push(appointment); // salvando as informações na variável da linha 17

    return appointment;
  }
}

export default AppointmentsRepository;
