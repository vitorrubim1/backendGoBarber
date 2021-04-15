// aq ficará a interface responsável por dizer qual será os métodos que o provedor de hash(senha criptografada) terá

export default interface IHashProvider {
  generateHash(payload: string): Promise<string>; // payload é o parâmetro para criptografar
  compareHash(payload: string, hashed: string): Promise<boolean>; // recebe uma senha criptografada e algo para comparar, e retorna boolean
}
