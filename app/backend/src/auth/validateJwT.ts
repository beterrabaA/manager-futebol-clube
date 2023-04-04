import { Response, NextFunction } from 'express';

import UserService from '../services/UserService';
import { tokenDecoder } from '../utils/token';
import Iuser from '../interfaces/user.interface';
import CustomRequest from '../interfaces/customReq.interface';

// const secret = process.env.JWT_SECRET as string;

class Midlleware {
  private service: UserService;

  constructor() {
    this.service = new UserService();
  }

  public validateJWT = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: 'Token not found' });

    try {
      const decoded = tokenDecoder(token) as Iuser;
      const user = await this.service.getUserByEmail(decoded.email);
      if (!user) return res.status(401).json({ message: 'Token must be a valid token' });

      req.role = decoded.role;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  };
}

export default Midlleware;
