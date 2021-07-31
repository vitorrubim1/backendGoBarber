import { v4 as uuid } from 'uuid';

import IUsersRepository from '@modules/users/repositories/IUsersRepository'; // interface responsável pelos métodos de retorno
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO'; // métodos da aplicação

import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';
import User from '../../infra/typeorm/entities/User';

// arquivo fake, sem nenhuma dependência do typeorm para ajudar nos teste, com métodos somente com javascript
// vamos criar todos métodos na mão, já que não teremos dependência do bd e nem do typeorm
class FakeUsersRepository implements IUsersRepository {
  private users: User[] = []; // criando array vazio de users para somente testar

  public async findById(id: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.id === id);

    return findUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.email === email);

    return findUser;
  }

  public async findAllProviders({
    except_user_id,
  }: IFindAllProvidersDTO): Promise<User[]> {
    let { users } = this; // = this.users

    if (except_user_id) {
      users = this.users.filter(user => user.id !== except_user_id); // quero todos os usuários que tenham o id diferente do que é passado pelo parâmetro
    }

    return users;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid() }, userData); // passo o userData por fora já que vem como objeto
    this.users.push(user); // puxando o user que vem do parâmetro pro array

    return user;
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id); // procurando se o user já está no array e se sim pego o index dele no array e mando pra variável findUser

    this.users[findIndex] = user; // na posição encontrada substituo pelo user que recebo por parâmetro
    return user; // retorno o user que recebo
  }
}

export default FakeUsersRepository;
