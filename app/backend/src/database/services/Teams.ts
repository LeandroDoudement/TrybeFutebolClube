import Teams from '../models/Teams';

export const findAllTeams = async () => Teams.findAll();

export const findTeamById = async (id: number) => Teams.findByPk(id);
