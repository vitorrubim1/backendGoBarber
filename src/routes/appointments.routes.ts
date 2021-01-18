import { Router } from 'express';

const appointmentsRouter = Router();

// middlewares
appointmentsRouter.post('/', (request, response) =>
  response.json({ message: 'Deu bom' }),
);

export default appointmentsRouter;
