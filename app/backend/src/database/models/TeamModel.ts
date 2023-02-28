import { Model, INTEGER, STRING } from 'sequelize';
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
      type: STRING(45),
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: 'teams',
    timestamps: false,
    underscored: true,
  },
);

export default Teams;
