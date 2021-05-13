import { getRepository, Repository } from 'typeorm';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository'; // interface responsável pelos métodos de retorno

import UserToken from '../entities/UserToken';

// arquivo responsável por criar, armazenar, ler, editar

class UserTokensRepository implements IUserTokensRepository {
  /*
   <User>: tipagem da classe, que é o model e a representação da tabela do bd
   implements: que será os métodos que esse arquivo deverá retornar
  */

  private ormRepository: Repository<UserToken>; // é uma entidade do typeorm, como os métodos de save, delete, update, save ...

  constructor() {
    this.ormRepository = getRepository(UserToken); // criando e buscando o repositorio de appointment
  }

  // BUSCAR UM USER PELO ID
  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = this.ormRepository.findOne({ where: { token } }); // procurando pra ver ser existe o token

    return userToken;
  }

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = this.ormRepository.create({ user_id }); // criando

    await this.ormRepository.save(userToken); // salvando

    return userToken;
  }
}

export default UserTokensRepository;
