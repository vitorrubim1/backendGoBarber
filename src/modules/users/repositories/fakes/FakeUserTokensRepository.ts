import { v4 as uuid } from 'uuid';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository'; // interface responsável pelos métodos de retorno

import UserToken from '../../infra/typeorm/entities/UserToken';

// arquivo fake, sem nenhuma dependência do typeorm para ajudar nos teste, com métodos somente com javascript
// vamos criar todos métodos na mão, já que não teremos dependência do bd e nem do typeorm

class FakeUserTokensRepository implements IUserTokensRepository {
  /*
   <User>: tipagem da classe, que é o model e a representação da tabela do bd
   implements: que será os métodos que esse arquivo deverá retornar
  */

  private userTokens: UserToken[] = []; // criando array vazio de tokens para somente testar

  // BUSCAR UM USER PELO ID
  public async generate(user_id: string): Promise<UserToken> {
    const userToken = new UserToken(); // instâncio a classe de tokens

    Object.assign(userToken, {
      id: uuid(),
      token: uuid(),
      user_id,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.userTokens.push(userToken);

    return userToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = this.userTokens.find(
      findToken => findToken.token === token,
    );

    return userToken;
  }
}

export default FakeUserTokensRepository;
