import { Router } from 'express';

import MatchController from '../controllers/MatchController ';

const matchRouter = Router();

const matController = new MatchController();

matchRouter.get('/matches', matController.findAll); // GET /teams

matchRouter.patch('/matches/:id/finish', matController.finish); // PATCH /teams/:id/finish

export default matchRouter;
