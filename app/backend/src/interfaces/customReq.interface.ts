import { Request } from 'express';

interface CustomRequest extends Request {
  role?: string;
}

export default CustomRequest;
