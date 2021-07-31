import { container } from 'tsyringe';

import '@modules/users/providers'; // para executar o provider de hash de senha
import './providers'; // para executar o provider de upload de image(ainda em disco)

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

// toda vez que uma classe injetar uma dependência 'AppointmentsRepository', como essa daqui foi registrada(registerSingleton) retornará uma instância da classe IAppointmentRepository;
container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository', // identificação do "registro"
  AppointmentsRepository, // e oq vai retornar, o generic obriga que tenha o formato da interface
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);
