import express from 'express';
import { createBooking } from '../controllers/bookingControllers.js';

const bookingRouter = express.Router();

// Define routes for booking operations
bookingRouter.post('/', createBooking); // Create a new booking

export default bookingRouter;