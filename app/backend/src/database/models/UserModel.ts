import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class User extends Model {
  declare readonly id: number;
  declare username: string;
  declare role: string;
  declare email: string;
  declare password: string;
}

User.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: STRING(45),
      allowNull: false,
    },
    role: {
      type: STRING(45),
      allowNull: false,
    },
    email: {
      type: STRING(45),
      allowNull: false,
    },
    password: {
      type: STRING(45),
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'User',
    tableName: 'users',
    timestamps: false,
    underscored: true,
  },
);

export default User;
