import { isEqual } from 'date-fns';

import Appointment from '../models/Appointment';

// arquivo responsável por criar, armazenar, ler, editar

class AppoinmentsRepository {
  private appointments: Appointment[]; // private: então não é acessível fora da classe

  constructor() {
    // iniciando a váriavel appointments, como array vazio
    this.appointments = [];
  }

  // METÓDO PARA ENCONTRAR UM AGENDAMENTO PELA MESMA DATA/HORA
  public findByDate(date: Date): Appointment | null {
    // caso encontre na mesma data retorna o próprio Appointment, caso não retorna null

    const findAppointment = this.appointments.find(appointment =>
      isEqual(date, appointment.date),
    );

    return findAppointment || null; // se não encontrar por padrão vem undefined, mas eu quero q seja null
  }

  // METÓDO DE CRIAÇÃO
  public create(provider: string, date: Date): Appointment {
    const appointment = new Appointment(provider, date); // instanciando o model e criando um novo agendamento

    this.appointments.push(appointment); // puxando pra lista

    return appointment;
  }
}

export default AppoinmentsRepository;
