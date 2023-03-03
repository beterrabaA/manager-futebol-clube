import { ModelStatic } from 'sequelize';
import Users from '../database/models/UserModel';
import TypeMsg from '../interfaces/resService.interface';

export default class UserService {
  public model: ModelStatic<Users>;

  constructor() {
    this.model = Users;
  }

  public async getUser(email: string, _password: string): Promise<TypeMsg> {
    const users = await this.model.findOne(
      { where: { email } },
    );

    console.log(users);

    if (!users) return { type: 'invalidToken', message: 'Invalid email or password' };

    return { type: 'success', message: users };
  }
}
