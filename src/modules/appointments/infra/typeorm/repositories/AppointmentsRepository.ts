import { getRepository, Repository, Raw } from 'typeorm'; // Raw: é como se fosse uma query SQL, onde o typeorm não interfere

import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository'; // interface responsável pelos métodos de retorno
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO'; // métodos da aplicação

import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
import Appointment from '../entities/Appointment';

// DTO: Data Transfer Object

// arquivo responsável por criar, armazenar, ler, editar

class AppointmentsRepository implements IAppointmentRepository {
  /*
   <Appointment>: tipagem da classe, que é o model e a representação da tabela do bd
   implements: que será os métodos que esse arquivo deverá retornar
  */

  private ormRepository: Repository<Appointment>; // é uma entidade do typeorm, como os métodos de save, delete, update, save ...

  constructor() {
    this.ormRepository = getRepository(Appointment); // criando e buscando o repositorio de appointment
  }

  // MÉTODO PARA ENCONTRAR UM AGENDAMENTO PELA MESMA DATA
  public async findByDate(date: Date): Promise<Appointment | undefined> {
    // Promise<>: pq a função é assíncrona
    // caso encontre na mesma data retorna o próprio Appointment, caso não retorna null

    const findAppointment = await this.ormRepository.findOne({
      where: { date }, // encontrar um agendamento que a data que eu recebo seja igual a alguma data no bd
    });

    return findAppointment || undefined; // se não encontrar por padrão vem undefined, mas eu quero q seja null
  }

  // método para consultar dias disponíveis de um prestador em um mes solicitado
  public async findAllInMonthFromProvider({
    provider_id,
    month,
    year,
  }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    const parsedMonth = String(month).padStart(
      2,
      '0',
    ); /*

    postgres devolver números com 2 caracters, ex: 06, nós recebemos somente 1 número.
    se não vier com dois dígitos, acrescento um 0 a esquerda com padStart
    */

    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(
          dateFieldName =>
            `to_char(${dateFieldName}, 'MM-YYYY') = "${parsedMonth}-${year}"`,
        ), // converto a data do postgres em string, para comparar com a data que recebo por parâmetro
      },
    });

    return appointments;
  }

  // MÉTODO PARA CRIAÇÃO DE UM APPOINTMENT E PRA SALVAR NO BD
  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({ provider_id, date }); // criando
    await this.ormRepository.save(appointment); // salvando

    return appointment;
  }
}

export default AppointmentsRepository;
