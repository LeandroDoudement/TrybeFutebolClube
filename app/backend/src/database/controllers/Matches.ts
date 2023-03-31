import { Response, Request } from 'express';
import {
  findAllMatches,
  findMatchesInProgress,
  finishMatch,
} from '../services/Matches';

export const getAllMatches = async (req: Request, res: Response) => {
  const { inProgress } = req.query;
  if (inProgress === 'true' || inProgress === 'false') {
    const inProgressMatches = await findMatchesInProgress(inProgress);
    return res.status(200).json(inProgressMatches);
  }
  const allMatches = await findAllMatches();
  return res.status(200).json(allMatches);
};

export const endMatch = async (req: Request, res: Response) => {
  const { id } = req.params;
  await finishMatch(id as string);
  return res.status(200).json({ message: 'Finished' });
};
