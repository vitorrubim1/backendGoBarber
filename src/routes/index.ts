import { Router } from 'express';

import appointmentsRouter from './appointments.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter); // caso seja algo relacionado a essa rota chama esse appointmentsRouter, e la decide se é get, post...

export default routes;
