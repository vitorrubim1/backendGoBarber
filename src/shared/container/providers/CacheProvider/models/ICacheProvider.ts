export default interface ICacheProvider {
  save(key: string, value: any): Promise<void>; // chave do cache e o valor q quero armazenar
  recover<T>(key: string): Promise<T | null>; // recuperar dados do cache, esse <T> é a tipagem que algum service vai usar pra informar a informação que quer de retorno do dado em cache. ex: cache.recover<User[]>()
  invalidate(key: string): Promise<void>; // apagar um cache
}
