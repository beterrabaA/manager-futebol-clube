import { ModelStatic } from 'sequelize';
import Teams from '../database/models/TeamModel';
import Matches from '../database/models/MatchModel';

export default class MatchService {
  private model: ModelStatic<Matches>;

  constructor() {
    this.model = Matches;
  }

  public async getAll() {
    const matches = await this.model.findAll({
      include: [
        { model: Teams, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });

    return { type: 'success', message: matches };
  }

  public async query(inProgress: boolean) {
    const matches = await this.model.findAll({
      where: { inProgress },
      include: [
        { model: Teams, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });

    return { type: 'success', message: matches };
  }

  public async finishMatch(id: number) {
    const match = await this.model.findByPk(id);

    if (!match) {
      return { type: 'notFound', message: 'Match not found' };
    }

    if (match.inProgress) {
      match.inProgress = false;
      await match.save();
      return { type: 'success', message: 'Finished' };
    }

    return { type: 'badRequest', message: 'Match already finished' };
  }
}
