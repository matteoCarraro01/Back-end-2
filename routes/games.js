import express from 'express';
import { createPost, findAll, findById, remove, update, uploadGameAvatar } from '../controllers/games.js';
import parser from '../middleware/cloudinary.js';
import { authentication } from '../middleware/authentication.js';






const gameRouter = express.Router();

gameRouter.get('/', findAll);
gameRouter.get('/:id', findById);
gameRouter.post('/', authentication, createPost);
gameRouter.delete('/:id', authentication, remove);
gameRouter.put('/:id', authentication, update);
gameRouter.patch('/:id/cover', parser.single('avatar'), uploadGameAvatar);



export default gameRouter;