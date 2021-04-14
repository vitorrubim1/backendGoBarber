import { getRepository, Repository } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository'; // interface responsável pelos métodos de retorno
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO'; // métodos da aplicação

import User from '../entities/User';

// arquivo responsável por criar, armazenar, ler, editar

class UsersRepository extends Repository<User> implements IUsersRepository {
  /*
   <User>: tipagem da classe, que é o model e a representação da tabela do bd
   implements: que será os métodos que esse arquivo deverá retornar
  */

  private ormRepository: Repository<User>; // é uma entidade do typeorm, como os métodos de save, delete, update, save ...

  constructor() {
    super();
    this.ormRepository = getRepository(User); // criando e buscando o repositorio de appointment
  }

  // BUSCAR UM USER PELO ID
  public async findById(id: string): Promise<User | undefined> {
    const user = this.ormRepository.findOne(id); // procurando user pelo id
    return user;
  }

  // BUSCAR UM USER PELO EMAIL
  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.ormRepository.findOne({
      where: { email },
    }); // procurando user pelo email
    return user;
  }

  // MÉTODO PARA CRIAÇÃO DE UM USER
  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(userData); // criando
    await this.ormRepository.save(user); // salvando

    return user;
  }

  // SALVANDO O USER NO BANCO
  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user); // retornando o user criado
  }
}

export default UsersRepository;
