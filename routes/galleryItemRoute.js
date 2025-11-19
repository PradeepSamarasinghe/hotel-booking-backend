import express from 'express';
import { createGalleryItem, getGalleryItem } from '../controllers/galleryItemControllers.js';  

const galleryItemRouter = express.Router();

// Define routes for gallery item operations
galleryItemRouter.post('/', createGalleryItem); // Create a new gallery item
galleryItemRouter.get('/', getGalleryItem)



export default galleryItemRouter;