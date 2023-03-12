import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import Teams from './TeamModel';

class Matches extends Model {
  declare readonly id: number;
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
      references: {
        model: 'teams',
        key: 'id',
      },
    },
    homeTeamGoals: {
      type: INTEGER,
      allowNull: false,
    },
    awayTeamId: {
      type: INTEGER,
      references: {
        model: 'teams',
        key: 'id',
      },
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
    modelName: 'Match',
    tableName: 'matches',
    timestamps: false,
    underscored: true,
  },
);

Matches.belongsTo(Teams, { foreignKey: 'homeTeamId', as: 'homeTeam' });
Matches.belongsTo(Teams, { foreignKey: 'awayTeamId', as: 'awayTeam' });

export default Matches;
