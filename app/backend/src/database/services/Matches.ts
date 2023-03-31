import Matches from '../models/Matches';
import Teams from '../models/Teams';

export const findAllMatches = async () => {
  const result = await Matches.findAll({
    include: [
      { model: Teams, as: 'homeTeam', attributes: { exclude: ['id'] } },
      { model: Teams, as: 'awayTeam', attributes: { exclude: ['id'] } },
    ],
  });
  return result;
};

export const findMatchesInProgress = async (inProgress: string) => {
  const result = await Matches.findAll({
    where: { inProgress: JSON.parse(inProgress.toLowerCase()) },
    include: [
      {
        model: Teams,
        as: 'awayTeam',
      },
      {
        model: Teams,
        as: 'homeTeam',
      },
    ],
  });
  return result;
};

export const finishMatch = async (id: string): Promise<void> => {
  await Matches.update({ inProgress: false }, { where: { id: Number(id) } });
};

interface MatchI {
  homeTeamGoals: string;
  awayTeamGoals: string;
}

export const updateMatch = async (id: string, match: MatchI): Promise<void> => {
  const { homeTeamGoals, awayTeamGoals } = match;
  await Matches.update(
    { homeTeamGoals, awayTeamGoals },
    { where: { id: Number(id) } },
  );
};

interface NewMatchI {
  homeTeamId: number;
  awayTeamId: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export const insertNewMatch = async (newMatch: NewMatchI) => {
  const result = await Matches.create({ ...newMatch, inProgress: true });
  return result;
};
