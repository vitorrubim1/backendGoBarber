import { container } from 'tsyringe';

import IAppointmentController from '@modules/appointments/controllers/IAppointmentController';
import AppointmentsController from '@modules/appointments/infra/typeorm/controllers/AppointmentsController';

import IUsersController from '@modules/users/controllers/IUsersController';
import UsersController from '@modules/users/infra/typeorm/controllers/UsersController';

container.registerSingleton<IAppointmentController>(
  'AppointmentsController', // identificação do "registro"
  AppointmentsController, // e oq vai retornar, o generic obriga que tenha o formato da interface
);

container.registerSingleton<IUsersController>(
  'UsersController', // identificação do "registro"
  UsersController, // e oq vai retornar, o generic obriga que tenha o formato da interface
);
