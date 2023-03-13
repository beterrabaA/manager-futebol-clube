import { Request, Response } from 'express';
import MatchService from '../services/MatchService';
import mapError from './errorMap';
import convertToBoolean from '../utils/boolean';

class MatchController {
  private service: MatchService;

  constructor() {
    this.service = new MatchService();
  }

  public findAll = async (req: Request, res: Response) => {
    const search = req.query;
    const conValue = convertToBoolean(search?.inProgress as string);

    if (conValue !== undefined) {
      const { type, message } = await this.service.query(conValue);
      return res.status(mapError(type)).json(message);
    }

    const { type, message } = await this.service.getAll();

    return res.status(mapError(type)).json(message);
  };

  public finish = async (req: Request, res: Response) => {
    const { id } = req.params;

    const { type, message } = await this.service.finishMatch(Number(id));

    return res.status(mapError(type)).json({ message });
  };

  public update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;

    const { type, message } = await this.service.updateMatch(Number(id), {
      homeTeamGoals,
      awayTeamGoals,
    });

    return res.status(mapError(type)).json({ message });
  };
}

export default MatchController;
