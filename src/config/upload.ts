import path from 'path'; // para lidar com caminhos dentro da aplicação, de forma global
import crypto from 'crypto';
import multer from 'multer'; // pra lidar com upload de imagem

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp'); // destino da imagem

export default {
  tmpFolder,
  uploadsFolder: path.resolve(tmpFolder, 'uploads'), // caminho uploads dentro de tmp

  storage: multer.diskStorage({
    // diskStorage, guardar images na máquina
    destination: tmpFolder,
    filename(request, file, callback) {
      // nome que a imagem terá
      const fileHash = crypto.randomBytes(10).toString('hex'); // gerando 10 caracteres aleatórios
      const fileName = `${fileHash}-${file.originalname}`; // hash-nome-original-do-arquivo

      return callback(null, fileName);
    },
  }),
};
