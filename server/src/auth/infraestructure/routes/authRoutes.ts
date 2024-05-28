import express, {Router} from 'express';
import {authController} from '../dependencies'
export const authRouter: Router = express.Router();

authRouter.post('/signin',authController.signin.bind(authController));
authRouter.post('/signup', authController.signup.bind(authController)); 