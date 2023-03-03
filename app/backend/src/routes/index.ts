import { Router } from 'express';
import teamRouter from './team.routes';
import userRouter from './user.routes';

const router = Router();

router.use(teamRouter);

router.use(userRouter);

export default router;
