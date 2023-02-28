import { ModelStatic } from 'sequelize';
import Teams from '../database/models/TeamModel';
import TypeMsg from '../interfaces/resService.interface';

export default class TeamService {
  public model: ModelStatic<Teams>;

  constructor() {
    this.model = Teams;
  }

  public async getAll(): Promise<TypeMsg> {
    const teams = await this.model.findAll();

    return { type: 'success', message: teams };
  }

  // export const getById = async (id: number) => {
  //   const team = await Teams.findByPk(id);
  //   return team;
  // };
}
