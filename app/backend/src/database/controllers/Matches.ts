import { Response, Request } from 'express';
import findAllMatches from '../services/Matches';

const getAllMatches = async (req: Request, res: Response) => {
  const allMatches = await findAllMatches();
  return res.status(200).json(allMatches);
};

export default getAllMatches;
