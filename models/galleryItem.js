import mongoose from 'mongoose';

const galleryItemSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        }
    }
)

const GalleryItem = mongoose.model('galleryItems', galleryItemSchema);
export default GalleryItem;