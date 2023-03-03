import { Router } from 'express';

import UserController from '../controllers/UserController';

const userRouter = Router();

const controller = new UserController();

userRouter.post('/login', controller.login); // POST /login (login)

export default userRouter;
