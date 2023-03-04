import { sign, verify } from 'jsonwebtoken';

import * as dotenv from 'dotenv';
import Payload from '../interfaces/payload.interface';

dotenv.config();

const { JWT_SECRET } = process.env as { [key: string]: string };

export const tokenGenerator = (payload: Payload) => sign(payload, JWT_SECRET);

export const tokenDecoder = (token:string) => verify(token, JWT_SECRET);
