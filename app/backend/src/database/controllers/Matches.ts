import { Response, Request } from 'express';
import {
  findAllMatches,
  findMatchesInProgress,
  finishMatch,
  insertNewMatch,
  updateMatch,
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

export const changeMatch = async (req: Request, res: Response) => {
  const { id } = req.params;
  const match = req.body;
  await updateMatch(id, match);
  return res.status(200).json({ message: 'Updated' });
};

export const createNewMatch = async (req: Request, res: Response) => {
  const newMatch = req.body;
  const result = await insertNewMatch(newMatch);
  return res.status(201).json(result);
};
