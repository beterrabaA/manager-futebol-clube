import { Request, Response } from 'express';
import TeamService from '../services/TeamService';
import mapError from './errorMap';

class TeamController {
  private service: TeamService;

  constructor() {
    this.service = new TeamService();
  }

  public findAll = async (req: Request, res: Response) => {
    const { type, message } = await this.service.getAll();

    return res.status(mapError(type)).json(message);
  };
}

export default TeamController;
