import express, { Router } from 'express';
import { candidateController } from '../dependencies';

export const candidateRouter: Router = express.Router();

candidateRouter.post('/create', candidateController.create.bind(candidateController));
candidateRouter.put('/update/:id', candidateController.update.bind(candidateController));
candidateRouter.delete('/delete/:id', candidateController.delete.bind(candidateController));
candidateRouter.get('/all', candidateController.getAll.bind(candidateController));
