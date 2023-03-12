import { Request, Response } from 'express';
import MatchService from '../services/MatchService';
import mapError from './errorMap';

class MatchController {
  private service: MatchService;

  constructor() {
    this.service = new MatchService();
  }

  public findAll = async (req: Request, res: Response) => {
    const { type, message } = await this.service.getAll();

    return res.status(mapError(type)).json(message);
  };

  //   public findById = async (req: Request, res: Response) => {
  //     const { id } = req.params;
  //     const { type, message } = await this.service.getById(Number(id));

//     return res.status(mapError(type)).json(message);
//   };
}

export default MatchController;
