import { Router } from 'express';

import MatchController from '../controllers/MatchController ';

const matchRouter = Router();

const matController = new MatchController();

matchRouter.get('/matches', matController.findAll); // GET /teams

export default matchRouter;
