import IHashProvider from '../models/IHashProvider';

class FakeHashProvider implements IHashProvider {
  public async generateHash(payload: string): Promise<string> {
    // como é para teste não preciso criptografar
    return payload;
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return payload === hashed; // recebo uma senha não criptografia e a que já foi criptografia, se tiver certo = true
  }
}

export default FakeHashProvider;
