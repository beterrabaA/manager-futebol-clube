import { Request, Response } from 'express';
import LeadService from '../services/LeadBoardService';
import mapError from './errorMap';

class LeadBoardController {
  private service: LeadService;

  constructor() {
    this.service = new LeadService();
  }

  public findAll = async (req: Request, res: Response) => {
    const { type, message } = await this.service.getAllLead();

    return res.status(mapError(type)).json(message);
  };

  public findHome = async (req: Request, res: Response) => {
    const { type, message } = await this.service.getHomeLead();

    return res.status(mapError(type)).json(message);
  };

  public findAway = async (req: Request, res: Response) => {
    const { type, message } = await this.service.getAwayLead();

    return res.status(mapError(type)).json(message);
  };
}

export default LeadBoardController;
