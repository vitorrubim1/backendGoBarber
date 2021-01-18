import express from 'express';

import routes from './routes';

const app = express();

app.use(express.json());

app.get('/', (request, response) => response.json({ message: 'Dale to gostack' }));

app.listen(3333, () => {
  console.log('Server is running... 🚀');
});
