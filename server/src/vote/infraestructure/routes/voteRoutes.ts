import express, { Router } from 'express';
import { voteController } from '../dependecies';

export const voteRouter: Router = express.Router();

voteRouter.post('/vote/:id', voteController.vote.bind(voteController));

voteRouter.get('/all-votes', voteController.getVotes.bind(voteController));
