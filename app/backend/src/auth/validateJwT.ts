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
      console.log(decoded);
      const user = this.service.getUserByEmail(decoded.email);
      if (!user) return res.status(401).json({ message: 'Token must be a valid token' });

      req.role = decoded.role;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Expired or invalid token' });
    }
  };
}

// const validateJWT = (req: Request, res: Response, next: NextFunction) => {
//   const token = req.headers.authorization;
//   if (!token) return res.status(401).json({ message: 'Token not found' });

//   try {
//     const decoded = verify(token, JWT_SECRET) as { email: string };
//     const user = service.getUserByEmail(decoded.email);
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: 'Expired or invalid token' });
//   }
// };

export default Midlleware;
