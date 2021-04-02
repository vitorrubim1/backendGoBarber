import { Router } from 'express';

import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter); // caso seja algo relacionado a essa rota chama esse appointmentsRouter, e la decide se é get, post...
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
