import { getRepository } from 'typeorm'; // getRepository: para ter os metódos de criação, update, delete disponivel
import { compare } from 'bcryptjs';

import User from '../models/User'; // representa uma tabela no banco

/*
 aq estará a regra de autenticação.
 irá ver se o email e senha é valido;
 e caso seja, gerar um token jwt
*/

interface Request {
  email: string;
  password: string;
}

interface Response {
  // retorno, caso a autenticação dê certo
  user: User;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User); // pra ter os metodos disponiveis, findOne, delete, create...

    const user = await usersRepository.findOne({ where: { email } }); // tentando buscar algum usuário pelo email do parametro

    if (!user) {
      throw new Error('Incorrect email/password combination'); // descrevo que pode ser alguns dos dois por segurança
    }

    /*
      variável user contém o email e senha
      password que vem do parametro não está criptografada
      user.password está criptografada
      compare do bcrypt: compara a senha não criptografada com a senha criptografada
    */

    const passwordMatched = await compare(password, user.password); // retorna booleano

    if (!passwordMatched) {
      throw new Error('Incorrect email/password combination');
    }

    // Chegou até aqui, usuário autenticado
    return {
      user,
    };
  }
}

export default AuthenticateUserService;
