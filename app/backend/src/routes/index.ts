import { Router } from 'express';
import teamRouter from './team.routes';
import userRouter from './user.routes';
import matchRouter from './match.routes';
import leadRouter from './lead.routes';

const router = Router();

router.use(teamRouter);

router.use(userRouter);

router.use(matchRouter);

router.use(leadRouter);

export default router;
