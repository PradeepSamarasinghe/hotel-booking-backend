import express from 'express';
import { createGalleryItem, getGalleryItem, deleteGalleryItem, updateGalleryItem } from '../controllers/galleryItemControllers.js';  

const galleryItemRouter = express.Router();

// Define routes for gallery item operations
galleryItemRouter.post('/', createGalleryItem); // Create a new gallery item
galleryItemRouter.get('/', getGalleryItem)
galleryItemRouter.delete('/:id', deleteGalleryItem); // Delete a gallery item by ID
galleryItemRouter.put('/:id', updateGalleryItem); // Update a gallery item by ID


export default galleryItemRouter;