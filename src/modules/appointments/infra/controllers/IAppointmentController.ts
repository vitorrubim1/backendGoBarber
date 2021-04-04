import Appointment from '../typeorm/entities/Appointment';

// arquivo que será responsável por dizer qual são os métodos que o controller dentro do typeorm>controller terá.

export default interface IAppointmentController {
  findByDate(date: Date): Promise<Appointment | undefined>;
}
