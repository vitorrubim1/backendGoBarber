import 'reflect-metadata'; // typeorm exige por conta que utilizamos decorators
import express from 'express';

import uploadConfig from './config/upload'; // arquivo de configuração de upload de imagem

import routes from './routes';
import './database';

const app = express();

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory)); // servindo pra aplicação de forma estática o arquivo físico, as imagens
app.use(routes); // usando o arquivo index de rotas

app.listen(3333, () => {
  console.log('Server is running... 🚀');
});
