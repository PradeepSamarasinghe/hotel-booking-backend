import express from 'express';
import { postUser, loginUser, getUser } from '../controllers/userControllers.js';

const usersRouter = express.Router();

// Define routes for user operations`

usersRouter.post('/', postUser); 
usersRouter.post('/login', loginUser); // Login user
usersRouter.get('/', getUser); // Get current logged-in user

export default usersRouter;