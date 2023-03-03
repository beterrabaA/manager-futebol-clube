import { Request, Response } from 'express';
import UserService from '../services/UserService';
import mapError from './errorMap';

class UserController {
  private service: UserService;

  constructor() {
    this.service = new UserService();
  }

  public login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const { type, message } = await this.service.getUser(email, password);

    return res.status(mapError(type)).json(message);
  };
}

export default UserController;
