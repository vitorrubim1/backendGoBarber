import { Router } from 'express';

import appointmentsRouter from './appointments.routes';
import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter); // caso seja algo relacionado a essa rota chama esse appointmentsRouter, e la decide se é get, post...
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
