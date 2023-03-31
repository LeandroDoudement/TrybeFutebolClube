import { Router } from 'express';
import {
  getAllMatches,
  endMatch,
  changeMatch,
} from '../database/controllers/Matches';
import { validateToken } from '../database/middlewares/loginValidation';

const matchesRouter = Router();

matchesRouter.get('/', getAllMatches);
matchesRouter.patch('/:id/finish', validateToken, endMatch);
matchesRouter.patch('/:id', validateToken, changeMatch);

export default matchesRouter;
