import express from 'express';
import { createBooking, getBookings, retrievBookingByDate } from '../controllers/bookingControllers.js';


const bookingRouter = express.Router();

// Define routes for booking operations
bookingRouter.post('/', createBooking); // Create a new booking
bookingRouter.get('/', getBookings); // Get bookings for the logged-in user
bookingRouter.post('/by-date', retrievBookingByDate); // Retrieve bookings by date range

export default bookingRouter;