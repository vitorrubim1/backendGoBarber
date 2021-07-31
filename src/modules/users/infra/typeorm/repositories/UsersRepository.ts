import { getRepository, Not, Repository } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';
import User from '../entities/User';

// arquivo responsável por criar, armazenar, ler, editar
class UsersRepository implements IUsersRepository {
  /*
   <User>: tipagem da classe, que é o model e a representação da tabela do bd
   implements: que será os métodos que esse arquivo deverá retornar
  */

  private ormRepository: Repository<User>; // é uma entidade do typeorm, como os métodos de save, delete, update, save ...

  constructor() {
    this.ormRepository = getRepository(User); // criando e buscando o repositório de usuário
  }

  public async findById(id: string): Promise<User | undefined> {
    const findAppointment = await this.ormRepository.findOne(id);

    return findAppointment;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { email },
    });

    return findAppointment;
  }

  // retorna todos users menos o que é passado pelo parâmetro (user logado)
  public async findAllProviders({
    except_user_id,
  }: IFindAllProvidersDTO): Promise<User[]> {
    let users: User[];

    if (except_user_id) {
      users = await this.ormRepository.find({
        where: {
          id: Not(except_user_id),
        },
      });
    } else {
      users = await this.ormRepository.find();
    }

    return users;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(userData);

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}

export default UsersRepository;
