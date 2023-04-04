import { Request, Response } from 'express';
import getHomeLeaderboard from '../services/HometeamLeaderboard';

const leaderboard = async (_req: Request, res: Response) => {
  const homeTeamLeaderboard = await getHomeLeaderboard();
  res.status(200).json(homeTeamLeaderboard);
};

export default leaderboard;
