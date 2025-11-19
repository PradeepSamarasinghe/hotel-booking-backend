import express from 'express';
import { postUser, loginUser } from '../controllers/userControllers.js';

const usersRouter = express.Router();

// Define routes for user operations`

usersRouter.post('/', postUser); 
usersRouter.post('/login', loginUser); // Login user

export default usersRouter;