import express from 'express';
import {createCategory, deleteCategory, getCategories, getCategoryByName} from '../controllers/categoryControllers.js';

const categoryRouter = express.Router();

// Define routes for category operations
categoryRouter.post('/', createCategory); // Create a new category
categoryRouter.delete('/:name', deleteCategory); // Delete a category by name
categoryRouter.get('/', getCategories); // Get all categories
categoryRouter.get('/:serchByPrice', (req,res) => {
    res.json({ message: 'searchByprice' });
});
categoryRouter.get('/:name', getCategoryByName); // Get a category by name

export default categoryRouter;