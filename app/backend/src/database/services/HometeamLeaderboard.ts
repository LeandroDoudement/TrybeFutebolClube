import Matches from '../models/Matches';
import Teams from '../models/Teams';
import { findMatchesInProgress } from './Matches';
import { findAllTeams } from './Teams';

interface Perfomance {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: number;
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
  goalsFavor: 0,
  goalsOwn: 0,
  goalsBalance: 0,
} as Perfomance;

const getResult = (result: Perfomance) => {
  const newResult = { ...result };
  newResult.goalsBalance = newResult.goalsFavor - newResult.goalsOwn;
  newResult.totalPoints = getTotalPoints(newResult);
  newResult.efficiency = getEfficiency(newResult);
  return newResult;
};

const getPerfomance = (matches: Matches[], team: Teams) => {
  const filters = getPerfomanceFilters();
  const result = matches.reduce(
    (acc, curr) => {
      if (curr.homeTeamId !== team.id) return acc;
      if (filters.isVictory(curr)) acc.totalVictories += 1;
      if (filters.isDraw(curr)) acc.totalDraws += 1;
      if (filters.isLost(curr)) acc.totalLosses += 1;
      acc.goalsFavor += curr.homeTeamGoals;
      acc.goalsOwn += curr.awayTeamGoals;
      acc.totalGames += 1;
      return acc;
    },
    { ...performanceDefaultValue },
  );
  result.name = team.teamName;
  return getResult(result);
};

const getHomeLeaderboard = async () => {
  const matches = await findMatchesInProgress('false');
  const teams = await findAllTeams();
  const leaderboard = teams.map((element) => {
    const result = getPerfomance(matches, element);
    return result;
  });
  return leaderboard;
};

const sortLeaderboard = async () => {
  const leaderboard = await getHomeLeaderboard();
  const sortedLeaderboard = leaderboard.sort((a, b) => {
    if (a.totalPoints > b.totalPoints) return -1;
    if (b.totalPoints > a.totalPoints) return 1;
    if (a.totalVictories < b.totalVictories) return 1;
    if (a.totalVictories > b.totalVictories) return -1;
    if (a.goalsBalance > b.goalsBalance) return -1;
    if (a.goalsBalance < b.goalsBalance) return 1;
    if (a.goalsFavor > b.goalsFavor) return -1;
    if (a.goalsFavor < b.goalsFavor) return 1;

    return 0;
  });
  return sortedLeaderboard;
};

export default sortLeaderboard;
