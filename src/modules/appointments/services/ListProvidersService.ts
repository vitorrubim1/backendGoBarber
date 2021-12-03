import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

/*
service responsável por adicionar uma imagem a um usuário,
por apagar uma imagem antiga caso o usuário esteja fazendo um update
somente alterar caso o usuário que esteja autenticado exista
*/
interface IRequest {
  user_id: string;
}

@injectable()
class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ user_id }: IRequest): Promise<User[]> {
    // buscando as informações em cache
    let users = await this.cacheProvider.recover<User[]>(
      `providers-list:${user_id}`,
    );

    if (!users) {
      // somente fará uma requisição ao banco se não encontrar dados cacheado
      users = await this.usersRepository.findAllProviders({
        except_user_id: user_id,
      });

      // cacheando as informações da listagem de provedores de serviço, excluindo o user logado
      await this.cacheProvider.save(`providers-list:${user_id}`, users);
    }

    return users;
  }
}

export default ListProvidersService;
