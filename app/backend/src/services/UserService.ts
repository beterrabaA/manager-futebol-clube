import { ModelStatic } from 'sequelize';
import * as bcrypt from 'bcryptjs';
import { tokenGenerator } from '../utils/token';
import Users from '../database/models/UserModel';
import TypeMsg from '../interfaces/resService.interface';
import validateLogin from './validations/validationsInputsValues';

export default class UserService {
  public model: ModelStatic<Users>;

  constructor() {
    this.model = Users;
  }

  public async getUser(email: string, password: string): Promise<TypeMsg> {
    const error = validateLogin(email, password);

    if (error.type !== 'NULL') return error;

    const users = await this.model.findOne(
      { where: { email } },
    );

    const vPass = bcrypt.compareSync(password, users?.dataValues.password || '-');

    console.log(users?.dataValues);
    if (!users || !vPass) {
      return { type: 'invalidToken',
        message: {
          message: 'Invalid email or password' } };
    }

    const token = tokenGenerator(users?.dataValues);

    return { type: 'success', message: { token } };
  }

  public async getUserByEmail(email: string) {
    const user = await this.model.findOne({ where: { email } });
    return user;
  }
}
