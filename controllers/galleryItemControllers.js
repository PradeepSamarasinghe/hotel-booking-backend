import GalleryItem from '../models/galleryItem.js';


export function createGalleryItem(req, res) {

    const user = req.user;
    if(user == null) {
        return res.status(401).json({ message: 'Please login to create a gallery item' });
    }
    if(user.type !== 'admin') {
        return res.status(403).json({ message: 'You do not have permission to create a gallery item' });
    }

    const galleryItem = req.body.item;
    const newGalleryItem = new GalleryItem(galleryItem);

    newGalleryItem.save().then(
        () => {
            res.status(201).json({ message : 'Gallery Item Create Successfully'})
        }
    ).catch(
        (err) => {
            res.status(500).json({ message: 'Error creating gallery item', error: err.message }); 
        } 

    )

}

export function getGalleryItem(req, res) {
    GalleryItem.find()
        .then((galleryItemsList) => {
            res.status(200).json(galleryItemsList);
        })
        .catch((err) => {   
            res.status(500).json({ message: 'Error fetching gallery items', error: err.message });
        }
    ); 
}

export function deleteGalleryItem(req, res) {
    const user = req.user;
    if(user == null) {
        return res.status(401).json({ message: 'Please login to delete a gallery item' });
    }
    if(user.type !== 'admin') {
        return res.status(403).json({ message: 'You do not have permission to delete a gallery item' });
    }
    const id = req.params.id;
    GalleryItem.findByIdAndDelete(id).then(
        () => {
            res.status(200).json({ message : 'Gallery Item Deleted Successfully'})
        }
    ).catch(
        (err) => {
            res.status(500).json({ message: 'Error deleting gallery item', error: err.message }); 
        }
    )
}
