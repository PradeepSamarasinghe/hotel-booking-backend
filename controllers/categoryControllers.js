import Category from "../models/category.js";
import { isAdminValid } from "./userControllers.js";
export function createCategory(req, res) {
    if(req.user == null) {
        return res.status(401).json({ message: 'Please login to create a category' });
    }
    if(req.user.type !== 'admin') {
        return res.status(403).json({ message: 'You do not have permission to create a category' });
    }
    const categoryData = req.body.category;
    const newCategory = new Category(categoryData);

    newCategory.save().then(
        (result) => {
            res.status(201).json({ message : 'Category Created Successfully', result: result})
            
        }
    ).catch(
        (err) => {
            res.status(500).json({ message: 'Error creating category', error: err.message }); 
        }
    )
    
}

export function deleteCategory(req, res) {
    if(req.user == null) {
        return res.status(401).json({ message: 'Please login to delete a category' });
    }
    if(req.user.type !== 'admin') {
        return res.status(403).json({ message: 'You do not have permission to delete a category' });
    }
    const name = req.params.name;
    Category.findOneAndDelete({ name: name }).then(
        () => {
            res.status(200).json({ message : 'Category Deleted Successfully'})
        }
    ).catch(
        (err) => {
            res.status(500).json({ message: 'Error deleting category', error: err.message }); 
        }
    )
}

export function getCategories(req, res) {
    Category.find()
        .then((categoriesList) => {
            res.status(200).json(categoriesList);
        })
        .catch((err) => {   
            res.status(500).json({ message: 'Error fetching categories', error: err.message });
        }
    );
}

export function getCategoryByName(req, res) {
    const name = req.params.name;
    Category.findOne({ name: name }).then(
        (result) => {
            if(result) {
                res.status(200).json(result);
            } else {
                res.status(404).json({ message: 'Category not found' });
            }

        }
    ).catch(
        (err) => {
            res.status(500).json({ message: 'Error fetching category', error: err.message }); 
        }
    )

}
export function updateCategory(req, res) {
    const adminValid = isAdminValid(req);

    if(!adminValid) {
        return res.status(403).json({ message: 'You do not have permission to update a category' });
    }

    const name = req.params.name;

    Category.updateOne({ name: name }, req.body).then(
        () => {
            res.status(200).json({ message : 'Category Updated Successfully'})
        }
    ).catch(
        (err) => {
            res.status(500).json({ message: 'Error updating category', error: err.message }); 
        }
    )
}
