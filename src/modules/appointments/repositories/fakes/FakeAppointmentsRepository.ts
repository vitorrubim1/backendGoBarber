import { v4 as uuid } from 'uuid';
import { isEqual, getMonth, getYear, getDate } from 'date-fns';

import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO'; // métodos da aplicação
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'; // interface responsável pelos métodos de retorno
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO';
import Appointment from '../../infra/typeorm/entities/Appointment';

export default class FakeAppointmentsRepository
  implements IAppointmentsRepository {
  // vamos criar na mão, já que não teremos dependência do bd e nem do typeorm
  private appointments: Appointment[] = []; // array de appointments

  // MÉTODO PARA ENCONTRAR UM AGENDAMENTO PELA MESMA DATA
  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(appointment.date, date),
    ); // percorrendo a variável da linha 17 para encontrar um appointment que tenha a mesma data

    return findAppointment;
  }

  // MÉTODO PARA CONSULTAR DIAS DISPONÍVEIS DE UM PRESTADOR EM UM MÊS SOLICITADO
  public async findAllInMonthFromProvider({
    provider_id,
    month,
    year,
  }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      appointment =>
        appointment.provider_id === provider_id && // provedor do parâmetro igual ao do bd
        getMonth(appointment.date) + 1 === month && // month + 1, já que começa no 0
        getYear(appointment.date) === year, // anos iguais
    ); // filtrando as datas que recebo por parâmetro e pelo id do provedor

    return appointments;
  }

  // MÉTODO PARA CONSULTAR HORAS DISPONÍVEIS DE UM PRESTADOR EM UM MÊS SOLICITADO
  public async findAllInDayFromProvider({
    provider_id,
    day,
    month,
    year,
  }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      appointment =>
        appointment.provider_id === provider_id && // provedor do parâmetro igual ao do bd
        getDate(appointment.date) === day && // dia igual do parâmetro
        getMonth(appointment.date) + 1 === month && // month + 1, já que começa no 0
        getYear(appointment.date) === year, // anos iguais
    );

    return appointments;
  }

  // MÉTODO PARA CRIAÇÃO DE UM APPOINTMENT E PRA SALVAR NO BD
  public async create({
    provider_id,
    user_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), date, provider_id, user_id }); // jogando tudo de dentro do objeto no "appointment"

    this.appointments.push(appointment);

    return appointment;
  }
}
