// nesse arquivo terá os métodos que um storage storage provider(lugar pra armazenar fotos)

export default interface IStorageProvider {
  saveFile(file: string): Promise<string>; // recebe o caminho do arquivo que ira ser salvo
  deleteFile(file: string): Promise<void>; // não devolve nada, só apaga
}
