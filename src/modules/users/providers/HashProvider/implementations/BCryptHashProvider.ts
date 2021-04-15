import { hash, compare } from 'bcryptjs';

import IHashProvider from '../models/IHashProvider';

class BCryptProvider implements IHashProvider {
  public async generateHash(payload: string): Promise<string> {
    // recebo a senha e vou gerar um hash

    return hash(payload, 8);
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed); // recebo uma senha não criptografia e a que já foi criptografia, se tiver certo = true
  }
}

export default BCryptProvider;
