import express, { Router } from 'express';
import { voteController } from '../dependecies';


export const voteRouter: Router = express.Router();

voteRouter.post('/vote', voteController.vote.bind(voteController));
