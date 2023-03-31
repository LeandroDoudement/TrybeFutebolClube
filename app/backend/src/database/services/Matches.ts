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
