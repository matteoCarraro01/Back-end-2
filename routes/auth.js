import express from 'express';
import { googleCallback, login, register } from '../controllers/auth.js';
import passport from 'passport';





const authRouter = express.Router();


authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
authRouter.get('/google/callback', passport.authenticate('google', { session: false }), googleCallback);



export default authRouter;


