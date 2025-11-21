import express from 'express';
import { createRoom, getRoomById, getRooms, deleteRoom, updateRoom , getRoomsByCategory} from '../controllers/roomsControllers.js';

const roomRouter = express.Router();

// Define routes for room operations
roomRouter.post('/', createRoom); // Create a new room
roomRouter.get('/:roomId', getRoomById); // Get a room by ID
roomRouter.get('/category/:category', getRoomsByCategory); // Get rooms by category
roomRouter.get('/', getRooms); // Get all rooms
roomRouter.delete('/:roomId', deleteRoom); // Delete a room by ID
roomRouter.put('/:roomId', updateRoom); // Update a room by ID

export default roomRouter;