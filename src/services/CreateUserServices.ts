import { getRepository } from 'typeorm'; //getRepository: para ter os metódos de criação, update, delete disponivel

import User from '../models/User';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ email, name, password }: Request): Promise<User> {
    // Promise<User>: metódo assíncrono que vai retornar um usuário

    const userRepository = getRepository(User);

    // checando se já existe algum usuário com o email da request
    const checkUserExist = await userRepository.findOne({
      where: { email },
    });

    if (checkUserExist) {
      throw new Error('Email address already used another user.');
    }

    // criando a instância do usuário
    const user = userRepository.create({ email, name, password });

    // salvando no banco
    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
