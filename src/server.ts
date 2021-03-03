import express from 'express';

import routes from './routes';
import './database';

const app = express();

app.use(express.json());

app.use(routes); // usando o arquivo index de rotas

app.listen(3333, () => {
  console.log('Server is running... 🚀');
});
