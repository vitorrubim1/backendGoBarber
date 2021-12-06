import { getRepository, Repository, Raw } from 'typeorm'; // Raw: é como se fosse uma query SQL, onde o typeorm não interfere

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'; // interface responsável pelos métodos de retorno
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO'; // métodos da aplicação

import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO';
import Appointment from '../entities/Appointment';

/*
  DTO: Data Transfer Object
  Arquivo responsável por criar, armazenar, ler, editar
*/
class AppointmentsRepository implements IAppointmentsRepository {
  /*
    <Appointment>: tipagem da classe, que é o model e a representação da tabela do bd
    implements: que será os métodos que esse arquivo deverá retornar
   */

  private ormRepository: Repository<Appointment>; // é uma entidade do typeorm, com os métodos de save, delete, update, save ...

  constructor() {
    this.ormRepository = getRepository(Appointment); // criando e buscando o repositório de appointment
  }

  // MÉTODO PARA ENCONTRAR UM AGENDAMENTO PELA MESMA DATA
  public async findByDate(
    date: Date,
    provider_id: string,
  ): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date, provider_id }, // encontrar um agendamento que a data que eu recebo seja igual a alguma data no bd
    });

    return findAppointment;
  }

  // MÉTODO PARA CONSULTAR DIAS DISPONÍVEIS DE UM PRESTADOR EM UM MÊS ESPECÍFICO
  public async findAllInMonthFromProvider({
    provider_id,
    month,
    year,
  }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    const parsedMonth = String(month).padStart(
      2,
      '0',
    ); /*
        postgres devolver números com 2 caracteres, ex: 06, nós recebemos somente 1 número.
        se não vier com dois dígitos, acrescento um 0 a esquerda com padStart
        */

    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(
          dateFieldName =>
            `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`,
        ), // converto a data do postgres em string, para comparar com a data que recebo por parâmetro
      },
    });

    return appointments;
  }

  // MÉTODO PARA CONSULTAR DIAS DISPONÍVEIS DE UM PRESTADOR EM UM MÊS ESPECÍFICO
  public async findAllInDayFromProvider({
    provider_id,
    day,
    month,
    year,
  }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
    const parsedDay = String(day).padStart(2, '0');
    const parsedMonth = String(month).padStart(2, '0');

    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(
          dateFieldName =>
            `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`,
        ),
      },
    });

    return appointments;
  }

  // MÉTODO PARA CRIAÇÃO DE UM APPOINTMENT E PRA SALVAR NO BD
  public async create({
    provider_id,
    user_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({
      provider_id,
      user_id,
      date,
    });

    await this.ormRepository.save(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
