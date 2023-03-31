import { Response, Request } from 'express';
import { findAllMatches, findMatchesInProgress } from '../services/Matches';

const getAllMatches = async (req: Request, res: Response) => {
  const { inProgress } = req.query;
  if (inProgress === 'true' || inProgress === 'false') {
    console.log('entrou');
    const inProgressMatches = await findMatchesInProgress(inProgress);
    return res.status(200).json(inProgressMatches);
  }
  const allMatches = await findAllMatches();
  return res.status(200).json(allMatches);
};

export default getAllMatches;
