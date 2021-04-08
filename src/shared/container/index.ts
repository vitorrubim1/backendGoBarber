import { container } from 'tsyringe';

import IAppointmentRepository from '@modules/appointments/repository/IAppointmentRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repository/AppointmentsRepository';

import IUsersRepository from '@modules/users/repository/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repository/UsersRepository';

container.registerSingleton<IAppointmentRepository>(
  'AppointmentsRepository', // identificação do "registro"
  AppointmentsRepository, // e oq vai retornar, o generic obriga que tenha o formato da interface
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository', // identificação do "registro"
  UsersRepository, // e oq vai retornar, o generic obriga que tenha o formato da interface
);
