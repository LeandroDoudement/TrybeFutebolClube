import { Router } from 'express';
import leaderboard from '../database/controllers/HometeamLeaderboard';

const homeTeamLeaderboardRouter = Router();

homeTeamLeaderboardRouter.get('/home', leaderboard);

export default homeTeamLeaderboardRouter;
