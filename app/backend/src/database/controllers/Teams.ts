import { Request, Response } from 'express';
import findAllTeams from '../services/Teams';

const getAllTeams = async (_req: Request, res: Response) => {
  try {
    const teams = await findAllTeams();
    return res.status(200).json(teams);
  } catch (error) {
    res.status(500).json(error);
  }
};

export default getAllTeams;
