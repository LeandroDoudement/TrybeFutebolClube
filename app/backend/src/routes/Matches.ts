import { Router } from 'express';
import getAllMatches from '../database/controllers/Matches';

const matchesRouter = Router();

matchesRouter.get('/', getAllMatches);

export default matchesRouter;
