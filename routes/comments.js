import express from 'express';
import { findAll, findById, create, getCancel, update } from '../controllers/comments.js';
import { authentication } from '../middleware/authentication.js';



const commentsRouter = express.Router();




commentsRouter.get('/games/:GameId/comments', findAll);
commentsRouter.get('/games/:GameId/comments/:id', findById);
commentsRouter.post('/games/:GameId/comments', authentication, create);
commentsRouter.delete('/games/:GameId/comments/:id', getCancel);
commentsRouter.put('/games/:GameId/comments/:id', update);














export default commentsRouter;