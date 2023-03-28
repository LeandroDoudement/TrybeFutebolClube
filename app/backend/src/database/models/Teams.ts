import { STRING, INTEGER, Model } from 'sequelize';
import db from '.';

class Teams extends Model {
  declare id: number;
  declare teamName: string;
}

Teams.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    teamName: {
      type: STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'teams',
    underscored: true,
    timestamps: false,
  },
);

export default Teams;
