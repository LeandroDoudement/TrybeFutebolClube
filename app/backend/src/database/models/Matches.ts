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
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: INTEGER,
    },
    homeTeamId: {
      type: INTEGER,
      allowNull: false,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      field: 'home_team_id',
      references: {
        model: 'teams',
        key: 'id',
      },
    },
    homeTeamGoals: {
      allowNull: false,
      defaultValue: 0,
      type: INTEGER,
      field: 'home_team_goals',
    },
    awayTeamId: {
      type: INTEGER,
      allowNull: false,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      field: 'away_team_id',
      references: {
        model: 'teams',
        key: 'id',
      },
    },
    awayTeamGoals: {
      allowNull: false,
      type: INTEGER,
      field: 'away_team_goals',
    },
    inProgress: {
      allowNull: false,
      type: BOOLEAN,
      field: 'in_progress',
    },
  },
  {
    sequelize: db,
    underscored: true,
    tableName: 'matches',
    timestamps: false,
  },
);
Teams.hasMany(Matches, { foreignKey: 'homeTeamId', as: 'homeMatch' });
Teams.hasMany(Matches, { foreignKey: 'awayTeamId', as: 'awayMatch' });
Matches.belongsTo(Teams, { foreignKey: 'homeTeamId', as: 'homeTeam' });
Matches.belongsTo(Teams, { foreignKey: 'awayTeamId', as: 'awayTeam' });

export default Matches;
