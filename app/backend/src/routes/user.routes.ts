import { Router } from 'express';

import UserController from '../controllers/UserController';
import Midlleware from '../auth/validateJwT';

const userRouter = Router();

const controller = new UserController();

const { validateJWT } = new Midlleware();

userRouter.post('/login', validateJWT, controller.login); // POST /login (login)

userRouter.get('/login/role', validateJWT, controller.role); // GET /role (role)

export default userRouter;
