import { Router } from 'express';

import ForgotPasswordController from '../controller/ForgotPasswordController';
import ResetPasswordController from '../controller/ResetPasswordController';

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController(); // desacoplo, pra conseguir usar os métodos
const resetPasswordController = new ResetPasswordControllerfrom(); // desacoplo, pra conseguir usar os métodos

// rota de autenticação

passwordRouter.post('/forgot', forgotPasswordController.create);
passwordRouter.post('/reset', resetPasswordController.create);

export default passwordRouter;
