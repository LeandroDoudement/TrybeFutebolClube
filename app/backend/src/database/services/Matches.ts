import Matches from '../models/Matches';
import Teams from '../models/Teams';

const findAllMatches = async () => {
  const result = await Matches.findAll({
    include: [
      { model: Teams, as: 'homeTeam', attributes: { exclude: ['id'] } },
      { model: Teams, as: 'awayTeam', attributes: { exclude: ['id'] } },
    ],
  });
  return result;
};

export default findAllMatches;
