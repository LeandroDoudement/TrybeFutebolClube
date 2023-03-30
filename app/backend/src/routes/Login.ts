import { Router } from 'express';
import login from '../database/controllers/Login';
import {
  validateEmail,
  verifyEmail,
  verifyPassword,
} from '../database/middlewares/loginValidation';

const loginRouter = Router();

loginRouter.post('/', validateEmail, verifyEmail, verifyPassword, login);

export default loginRouter;
