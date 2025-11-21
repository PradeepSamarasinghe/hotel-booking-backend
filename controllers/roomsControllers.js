import Room from '../models/room.js';
import { isAdminValid } from './userControllers.js';

export function createRoom(req, res) {
    if(!isAdminValid(req)) {
        return res.status(403).json({ message: 'You do not have permission to create a room' });
    }
    const newRoom = new Room(req.body).save().then(
        (result) => {
            res.status(201).json({ message : 'Room Created Successfully', result: result})
        }
    ).catch(
        (err) => {
            res.status(500).json({ message: 'Error creating room', error: err.message });
        }
    )
}
//delete room
export function deleteRoom(req, res) {
    if(!isAdminValid(req)) {
        return res.status(403).json({ message: 'You do not have permission to delete a room' });
    }

    const roomId = req.params.roomId;

    Room.findOneAndDelete({roomId : roomId}).then(
        () => {
            res.status(200).json({ message : 'Room Deleted Successfully'})
        }
    ).catch(
        (err) => {
            res.status(500).json({ message: 'Error deleting room', error: err.message });
        }
    )

}

//find rooms by IDs
export function getRoomById(req, res) {
    const roomId = req.params.roomId;

    Room.findOne({roomId : roomId}).then(
        (result) => {
            if(result) {
                res.status(200).json(result);
            } else {
                res.status(404).json({ message: 'Room not found' });
            }
        }
    ).catch(
        (err) => {
            res.status(500).json({ message: 'Error fetching room', error: err.message });
        }
    )
}

//get all rooms
export function getRooms(req, res) {
    Room.find()
        .then((roomsList) => {
            res.status(200).json(roomsList);
        })
        .catch((err) => {   
            res.status(500).json({ message: 'Error fetching rooms', error: err.message });
        }
    );
}

//update room
export function updateRoom(req, res) {
    if(!isAdminValid(req)) {
        return res.status(403).json({ message: 'You do not have permission to update a room' });
    }
    const roomId = req.params.roomId;

    Room.findOneAndUpdate({ roomId : roomId }, req.body).then(
        () => {
            res.status(200).json({ message : 'Room Updated Successfully'})
        }
    ).catch(
        (err) => {
            res.status(500).json({ message: 'Error updating room', error: err.message });
        }
    )
}

//find rooms by category
export function getRoomsByCategory(req, res) {
    const category = req.params.category;

    Room.find({category : category}).then(
        (roomsList) => {
            res.status(200).json(roomsList);
        }
    ).catch(
        (err) => {
            res.status(500).json({ message: 'Error fetching rooms by category', error: err.message });
        }
    )
}