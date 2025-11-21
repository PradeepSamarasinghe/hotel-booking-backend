import express from 'express';
import {createCategory, deleteCategory, getCategories, getCategoryByName, updateCategory} from '../controllers/categoryControllers.js';

const categoryRouter = express.Router();

// Define routes for category operations
categoryRouter.post('/', createCategory); // Create a new category
categoryRouter.delete('/:name', deleteCategory); // Delete a category by name
categoryRouter.get('/', getCategories); // Get all categories
categoryRouter.get('/:name', getCategoryByName); // Get a category by name
categoryRouter.put('/:name', updateCategory )


export default categoryRouter;