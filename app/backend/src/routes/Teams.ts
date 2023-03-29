import { Router } from 'express';
import { getAllTeams, getTeamById } from '../database/controllers/Teams';

const teamRouter = Router();

teamRouter.get('/', getAllTeams);

teamRouter.get('/:id', getTeamById);

export default teamRouter;
