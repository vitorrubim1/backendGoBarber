// aq ficará a interface responsável por dizer qual será os métodos que o provedor de hash(senha criptografada) terá

export default interface IHashProvider {
  generateHash(payload: string): Promise<string>;
  compareHash(payload: string, hashed: string): Promise<boolean>;
}
