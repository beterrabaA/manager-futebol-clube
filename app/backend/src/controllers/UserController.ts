import { Request, Response } from 'express';
import UserService from '../services/UserService';
import mapError from './errorMap';
import CustomRequest from '../interfaces/customReq.interface';
import { tokenGenerator } from '../utils/token';

class UserController {
  private service: UserService;

  constructor() {
    this.service = new UserService();
  }

  public login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const { type, message } = await this.service.getUser(email, password);

    if (type) return res.status(mapError(type)).json({ message });

    const token = tokenGenerator({ email, password });

    return res.status(200).json({ token });
  };

  public role = async (req: CustomRequest, res: Response) => {
    const { role } = req;
    
    return res.status(200).json({ role });
  };
}

export default UserController;
