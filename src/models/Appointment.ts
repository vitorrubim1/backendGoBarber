import { v4 as uuid } from 'uuid';

class Appointment {
  id: string;

  provider: string;

  date: Date;

  constructor({ provider, date }: Omit<Appointment, 'id'>) {
    // Omit: é uma função helper que ajuda a omitir uma informação, o id eu não preciso então digo que dentro de Appointment, o dado q quero omitir é o id
    this.id = uuid();
    this.provider = provider;
    this.date = date;
  }
}

export default Appointment;
