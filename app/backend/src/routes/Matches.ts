import { Router } from 'express';
import { getAllMatches, endMatch } from '../database/controllers/Matches';
import { validateToken } from '../database/middlewares/loginValidation';

const matchesRouter = Router();

matchesRouter.get('/', getAllMatches);
matchesRouter.patch('/:id/finish', validateToken, endMatch);

export default matchesRouter;
