import { Router } from 'express';

import LeadBoardController from '../controllers/LeadBoardController';

const leadRouter = Router();

const leadController = new LeadBoardController();

leadRouter.get('/leaderboard', leadController.findAll); // GET /leadboard

export default leadRouter;
