import express from 'express';
import dotenv from 'dotenv';
import { connect } from './DB.js'
import authorRouter from './routes/authors.js';
import gameRouter from './routes/games.js';
import cors from 'cors';
import commentsRouter from './routes/comments.js';
import authRouter from './routes/auth.js';
import passport from 'passport';
import googleStrategy from './strategy/googleStrategy.js';




dotenv.config();
connect();



const app = express();



app.use(cors())
app.use(express.json());



app.get('/', (request, response) => {
    response.status(200).json({ message: 'James gatto' })
});


passport.use(googleStrategy);
app.use('/authors', authorRouter);
app.use('/games', gameRouter);
app.use('/', commentsRouter);
app.use('/auth', authRouter);


app.listen(process.env.PORT, () => {
    console.log("server in ascolto")
});