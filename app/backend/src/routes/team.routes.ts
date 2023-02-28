import { Router } from 'express';

import TeamController from '../controllers/TeamController';

const teamRouter = Router();

const controller = new TeamController();

teamRouter.get('/teams', controller.findAll); // GET /teams

export default teamRouter;
