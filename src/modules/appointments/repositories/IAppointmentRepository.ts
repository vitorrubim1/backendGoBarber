import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IFindAllInMonthFromProviderDTO from '../dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '../dtos/IFindAllInDayFromProviderDTO';

// arquivo que será responsável por dizer qual são os métodos que o repository dentro do typeorm>repository terá.

export default interface IAppointmentRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>; // já que estou desacoplando a aplicação do typeorm, estou "criando/definindo" qual será as informações que meu método de criação terá
  findByDate(date: Date): Promise<Appointment | undefined>;

  findAllInMonthFromProvider(
    data: IFindAllInMonthFromProviderDTO,
  ): Promise<Appointment[]>;

  findAllInDayFromProvider(
    data: IFindAllInDayFromProviderDTO,
  ): Promise<Appointment[]>;
}
