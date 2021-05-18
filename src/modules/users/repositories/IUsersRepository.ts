import IFindAllProvidersDTO from '@modules/appointments/dtos/IFindAllProvidersDTO';

import User from '../infra/typeorm/entities/User'; // model de user
import ICreateUserDTO from '../dtos/ICreateUserDTO';

// arquivo que será responsável por dizer qual são os métodos que o repository dentro do typeorm>repository terá.
export default interface IUsersRepository {
  findAllProviders(data: IFindAllProvidersDTO): Promise<User[]>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}
