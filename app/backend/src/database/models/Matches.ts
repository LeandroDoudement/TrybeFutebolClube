import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import Teams from './Teams';

class Matches extends Model {
  declare id: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Matches.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    homeTeamId: {
      type: INTEGER,
      allowNull: false,
    },
    homeTeamGoals: {
      type: INTEGER,
      allowNull: false,
    },
    awayTeamId: {
      type: INTEGER,
      allowNull: false,
    },
    awayTeamGoals: {
      type: INTEGER,
      allowNull: false,
    },
    inProgress: {
      type: BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    underscored: true,
    modelName: 'Matches',
    timestamps: false,
  },
);

Teams.belongsTo(Matches, { foreignKey: 'id', as: 'homeTeam' });
Teams.belongsTo(Matches, { foreignKey: 'id', as: 'awayTeam' });

Matches.hasMany(Teams, { foreignKey: 'home_team_id', as: 'homeTeam' });
Matches.hasMany(Teams, { foreignKey: 'away_team_id', as: 'awayTeam' });

export default Matches;
