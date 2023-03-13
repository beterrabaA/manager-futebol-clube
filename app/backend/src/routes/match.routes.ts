import { Router } from 'express';

import MatchController from '../controllers/MatchController ';
import Midlleware from '../auth/validateJwT';

const matchRouter = Router();

const matController = new MatchController();
const { validateJWT } = new Midlleware();

matchRouter.get('/matches', matController.findAll); // GET /teams

matchRouter.patch('/matches/:id/finish', validateJWT, matController.finish); // PATCH /teams/:id/finish

export default matchRouter;
