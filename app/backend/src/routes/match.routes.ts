import { Router } from 'express';

import MatchController from '../controllers/MatchController ';
import Midlleware from '../auth/validateJwT';

const matchRouter = Router();

const matController = new MatchController();
const { validateJWT } = new Midlleware();

matchRouter.get('/matches', matController.findAll); // GET /matches

matchRouter.patch('/matches/:id/finish', validateJWT, matController.finish); // PATCH /matches/:id/finish

matchRouter.patch('/matches/:id', validateJWT, matController.update); // PATCH /matches/:id

matchRouter.post('/matches', validateJWT, matController.create); // POST /matches

export default matchRouter;
