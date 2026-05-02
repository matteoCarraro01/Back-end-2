import express from 'express';
import { findAll, findById, create, getCancel, update, uploadAvatar } from '../controllers/authors.js';
import parser from '../middleware/cloudinary.js';



const authorRouter = express.Router();

authorRouter.get('/', findAll);
authorRouter.get('/:id', findById);
authorRouter.post('/', create);
authorRouter.delete('/:id', getCancel);
authorRouter.put('/:id', update);
authorRouter.patch('/:id/avatar', parser.single('avatar'), uploadAvatar);




export default authorRouter;