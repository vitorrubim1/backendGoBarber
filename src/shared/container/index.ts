import { container } from 'tsyringe';

import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

container.registerSingleton<IAppointmentRepository>(
  'AppointmentsRepository', // identificação do "registro"
  AppointmentsRepository, // e oq vai retornar, o generic obriga que tenha o formato da interface
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository', // identificação do "registro"
  UsersRepository, // e oq vai retornar, o generic obriga que tenha o formato da interface
);
