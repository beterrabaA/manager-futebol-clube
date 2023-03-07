import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import UserService from '../services/UserService';

const { JWT_SECRET } = process.env as { [key: string]: string };

class Midlleware {
  private service: UserService;

  constructor() {
    this.service = new UserService();
  }

  public validateJWT = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: 'Token not found' });

    try {
      const decoded = verify(token, JWT_SECRET) as { email: string };
      const user = this.service.getUserByEmail(decoded.email);
      if (!user) return res.status(401).json({ message: 'Token must be a valid token' });
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Expired or invalid token' });
    }
  };
}

const validateJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'Token not found' });

  try {
    const decoded = verify(token, JWT_SECRET) as { email: string };
    const user = service.getUserByEmail(decoded.email);
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

export default validateJWT;
