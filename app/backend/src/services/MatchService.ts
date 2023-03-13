import { ModelStatic, Op } from 'sequelize';
import Teams from '../database/models/TeamModel';
import Matches from '../database/models/MatchModel';
import MatchData from '../interfaces/matchData.interface';
import Match from '../interfaces/match.interface';
import { validateTeams } from './validations/validationsInputsValues';

export default class MatchService {
  private model: ModelStatic<Matches>;
  private teamModel: ModelStatic<Teams>;

  constructor() {
    this.model = Matches;
    this.teamModel = Teams;
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

  public async updateMatch(id: number, data: MatchData) {
    const match = await this.model.findByPk(id);

    if (!match) {
      return { type: 'notFound', message: 'Match not found' };
    }

    if (match.inProgress) {
      match.homeTeamGoals = data.homeTeamGoals;
      match.awayTeamGoals = data.awayTeamGoals;
      await match.save();
      return { type: 'success', message: 'Updated' };
    }

    return { type: 'badRequest', message: 'Match already finished' };
  }

  public async createMatch(data: Match) {
    const error = validateTeams(data);

    if (error.type !== 'NULL') return error;

    const checkTeams = await this.teamModel.findAll(
      { where: { id: { [Op.in]: [data.homeTeamId, data.awayTeamId] } } },
    );

    if (checkTeams.length !== 2) {
      return { type: 'notFound', message: { message: 'There is no team with such id!' } };
    }

    const match = await this.model.create({ ...data, inProgress: true });

    return { type: 'created', message: match };
  }
}
