import { getRepository } from 'typeorm'; // getRepository: para ter os metódos de criação, update, delete disponivel
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken'; // sign: pra criar um token/ assinar

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
  token: string;
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

    const token = sign({}, '55F1D5153F0C649D3406C4506DE66C99', {
      subject: user.id,
      expiresIn: '1d',
    }); /*
      primeiro parametro: payload (dá pra descriptografar). Fica dentro do token, mas não fica seguro
      segundo parametro: chave secreta, que só a aplicação possa entender, só gerar qualquer coisa no md5 online
      terceiro parametro: configurações do token, como id e tempo pra expirar o token
    */

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;