import express from 'express';
import { createPost, findAll, findById, remove, update, uploadGameAvatar } from '../controllers/games.js';
import parser from '../middleware/cloudinary.js';
import { authentication } from '../middleware/authentication.js';
import { adminOnly } from '../middleware/adminOnly.js';






const gameRouter = express.Router();

gameRouter.get('/', findAll);
gameRouter.get('/:id', findById);
gameRouter.post('/', authentication, adminOnly, createPost);
gameRouter.delete('/:id', authentication, adminOnly, remove);
gameRouter.put('/:id', authentication, adminOnly, update);
gameRouter.patch('/:id/cover', parser.single('avatar'), uploadGameAvatar);



export default gameRouter;