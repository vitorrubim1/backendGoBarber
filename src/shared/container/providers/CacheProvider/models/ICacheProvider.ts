export default interface ICacheProvider {
  save(key: string, value: string): Promise<void>; // chave do cache e o valor q quero armazenar
  recover(key: string): Promise<string | null>; // recuperar dados do cache
  invalidate(key: string): Promise<void>; // apagar um cache
}
