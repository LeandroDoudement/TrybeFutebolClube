import Teams from '../models/Teams';

const findAllTeams = async () => {
  const teams = await Teams.findAll();
  console.log(teams);
  return teams;
};

export default findAllTeams;
