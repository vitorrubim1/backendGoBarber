// por enquanto os arquivos(fotos) serão gravados em disco

import IStorageProvider from '../models/IStorageProvider';

class FakeStorageProvider implements IStorageProvider {
  private storage: string[] = []; // array de string

  public async saveFile(file: string): Promise<string> {
    this.storage.push(file); // pegando o array e jogando o arquivo que recebo por parâmetros

    return file; // retorno o nome do arquivo
  }

  public async deleteFile(file: string): Promise<void> {
    const findIndex = this.storage.findIndex(
      storageFile => storageFile === file,
    ); // procurando o arquivo que tenha o mesmo nome

    this.storage.splice(findIndex, 1); // removendo do array caso ache
  }
}

export default FakeStorageProvider;
