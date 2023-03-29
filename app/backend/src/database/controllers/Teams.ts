import { Request, Response } from 'express';
import { findAllTeams, findTeamById } from '../services/Teams';

export const getAllTeams = async (_req: Request, res: Response) => {
  const teams = await findAllTeams();
  return res.status(200).json(teams);
};

export const getTeamById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const team = await findTeamById(Number(id));
  return res.status(200).json(team);
};
