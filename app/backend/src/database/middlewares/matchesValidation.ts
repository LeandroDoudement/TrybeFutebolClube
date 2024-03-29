import { Request, Response, NextFunction } from 'express';
import { findTeamById } from '../services/Teams';

const validateNewMatch = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { homeTeamId, awayTeamId } = req.body;
  if (homeTeamId === awayTeamId) {
    return res.status(422).json({
      message: 'It is not possible to create a match with two equal teams',
    });
  }
  const homeTeam = await findTeamById(homeTeamId);
  const awayTeam = await findTeamById(awayTeamId);
  if (!homeTeam || !awayTeam) {
    return res.status(404).json({ message: 'There is no team with such id!' });
  }
  next();
};

export default validateNewMatch;
