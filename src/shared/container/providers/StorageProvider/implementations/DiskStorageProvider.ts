// por enquanto os arquivos(fotos) serão gravados em disco

import fs from 'fs';
import path from 'path';

import uploadConfig from '@config/upload';

import IStorageProvider from '../models/IStorageProvider';

class DiskStorageProvider implements IStorageProvider {
  public async saveFile(file: string): Promise<string> {
    // esse rename fará a mudança do arquivo da pasta tmp para a pasta uploads, como se o arquivo de fato tivesse sido salvo
    await fs.promises.rename(
      path.resolve(uploadConfig.tmpFolder, file), // entro no diretório tmp e pego o nome do arquivo
      path.resolve(uploadConfig.uploadsFolder, file), // e aqui movo pra upload
    );

    return file; // retorno o nome do arquivo
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.uploadsFolder, file); // caminho do arquivo

    // aq vejo se existe, se sim apago.
    try {
      await fs.promises.stat(filePath); // esse stat retorna informações caso ele ache o arquivo, se não ele dá um erro
    } catch {
      return; // se não achar nada só para por aq mesmo
    }

    await fs.promises.unlink(filePath); // unlink é a forma de deletar, só chegará aq se cair no try
  }
}

export default DiskStorageProvider;
