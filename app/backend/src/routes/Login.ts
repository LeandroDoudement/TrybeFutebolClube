import { Router } from 'express';
import { login, loginUserRole } from '../database/controllers/Login';

import {
  validateEmail,
  validateToken,
  verifyEmail,
  verifyPassword,
} from '../database/middlewares/loginValidation';

const loginRouter = Router();

loginRouter.post('/', validateEmail, verifyEmail, verifyPassword, login);
loginRouter.get('/role', validateToken, loginUserRole);

export default loginRouter;
