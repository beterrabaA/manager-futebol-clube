import { Router } from 'express';

import LeadBoardController from '../controllers/LeadBoardController';

const leadRouter = Router();

const leadController = new LeadBoardController();

leadRouter.get('/leaderboard', leadController.findAll); // GET /leadboard

leadRouter.get('/leaderboard/home', leadController.findHome); // GET /leadboard/home

leadRouter.get('/leaderboard/away', leadController.findAway); // GET /leadboard/away

export default leadRouter;
