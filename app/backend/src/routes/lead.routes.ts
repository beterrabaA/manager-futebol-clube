import { Router } from 'express';

import LeadBoardController from '../controllers/LeadBoardController';

const leadRouter = Router();

const leadController = new LeadBoardController();

leadRouter.get('/leadboard', leadController.findAll); // GET /leadboard

export default leadRouter;
