import Booking from "../models/booking.js";
import { isCustomerValid } from "./userControllers.js";

export function createBooking(req, res) {
    if(!isCustomerValid(req)) {
        return res.status(403).json({ message: 'You do not have permission to create a booking' });
    }
    const startingId = 1200;
    Booking.countDocuments({}).then(
        (count) => {
            const newId = (startingId + count + 1);
            console.log("Count:", count)
            const newBooking = new Booking({
                bookingId: newId,
                roomId: req.body.roomId,
                email: req.user.email,
                checkInDate: req.body.checkInDate,
                checkOutDate: req.body.checkOutDate,
            })
            newBooking.save().then(
                (result) => {
                    res.status(201).json({ message : 'Booking Created Successfully', result: result})
                }
            ).catch(
                (err) => {
                    res.status(500).json({ message: 'Error creating booking', error: err.message });
                }
            )
        }
    ).catch(
        (err) => {
            res.status(500).json({ message: 'Error creating booking', error: err.message });
        }
    )
}