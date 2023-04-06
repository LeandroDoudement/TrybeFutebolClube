import { Request, Response } from 'express';
import sortLeaderboard from '../services/HometeamLeaderboard';

const leaderboard = async (_req: Request, res: Response) => {
  const homeTeamLeaderboard = await sortLeaderboard();
  res.status(200).json(homeTeamLeaderboard);
};

export default leaderboard;
