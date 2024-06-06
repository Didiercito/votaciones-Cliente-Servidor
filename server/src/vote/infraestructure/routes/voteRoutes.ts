import express, { Router } from 'express';
import { voteController } from '../dependecies';

export const voteRouter: Router = express.Router();

voteRouter.post('/vote/:id', voteController.vote.bind(voteController));
voteRouter.get('/votes', voteController.getVotes.bind(voteController));
voteRouter.get('/total-votes', voteController.getTotalVotes.bind(voteController));
