import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';

// arquivo que será responsável por dizer qual são os métodos que o repository dentro do typeorm>repository terá.

export default interface IAppointmentRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>; // já que estou desacoplando a aplicação do typeorm, estou "criando/definindo" qual será as informações que meu método de criação terá
  findByDate(date: Date): Promise<Appointment | undefined>;
}
