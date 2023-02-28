import { Router } from 'express';
import teamRouter from './team.routes';

const router = Router();

router.use(teamRouter);

export default router;
