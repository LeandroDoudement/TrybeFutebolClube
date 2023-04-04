import Matches from '../models/Matches';
import Teams from '../models/Teams';
import { findMatchesInProgress } from './Matches';
import { findAllTeams } from './Teams';

interface Perfomance {
  name: string;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  totalGames: number;
  totalPoints: number;
  goalsFavor: number;
  goalsOwn: number;
  efficiency: number;
  goalsBalance: number;
}

const getPerfomanceFilters = () => ({
  isVictory: ({ awayTeamGoals, homeTeamGoals }: Matches) =>
    awayTeamGoals < homeTeamGoals,
  isDraw: ({ homeTeamGoals, awayTeamGoals }: Matches) =>
    homeTeamGoals === awayTeamGoals,
  isLost: ({ awayTeamGoals, homeTeamGoals }: Matches) =>
    awayTeamGoals > homeTeamGoals,
});

const getTotalPoints = (perfomance: Perfomance) => {
  let points = 0;
  points += perfomance.totalVictories * 3;
  points += perfomance.totalDraws;
  return points;
};

const getEfficiency = (perfomance: Perfomance) =>
  +((perfomance.totalPoints / (perfomance.totalGames * 3)) * 100).toFixed(2);

const performanceDefaultValue = {
  totalVictories: 0,
  totalDraws: 0,
  totalGames: 0,
  totalLosses: 0,
  totalPoints: 0,
} as Perfomance;

const getPerfomance = (matches: Matches[], team: Teams) => {
  const filters = getPerfomanceFilters();

  const result = matches.reduce((acc, curr) => {
    if (curr.homeTeamId !== team.id) return acc;
    if (filters.isVictory(curr)) acc.totalVictories += 1;
    if (filters.isDraw(curr)) acc.totalDraws += 1;
    if (filters.isLost(curr)) acc.totalLosses += 1;

    acc.goalsFavor = curr.homeTeamGoals;
    acc.goalsOwn = curr.awayTeamGoals;
    acc.goalsBalance = curr.homeTeamGoals - curr.awayTeamGoals;
    acc.totalGames += 1;
    return acc;
  }, performanceDefaultValue);
  result.name = team.teamName;
  result.totalPoints = getTotalPoints(result);
  result.efficiency = getEfficiency(result);
  return result;
};

const getHomeLeaderboard = async () => {
  const matches = await findMatchesInProgress('false');
  const teams = await findAllTeams();
  const leaderboard = teams.map((element) => getPerfomance(matches, element));
  return leaderboard;
};

export default getHomeLeaderboard;
