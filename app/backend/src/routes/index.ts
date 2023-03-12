import { Router } from 'express';
import teamRouter from './team.routes';
import userRouter from './user.routes';
import matchRouter from './match.routes';

const router = Router();

router.use(teamRouter);

router.use(userRouter);

router.use(matchRouter);

export default router;
