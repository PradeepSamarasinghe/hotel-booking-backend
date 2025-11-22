import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    bookingId: {
        type: String,
        required: true,
        unique: true
    },
    roomId: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'pending' // Default status is 'pending'
    },
    reason: {
        type: String,
        default: ''
    },
    checkInDate: {
        type: Date,
        required: true
    },
    checkOutDate: {
        type: Date,
        required: true
    },
    notes: {
        type: String,
        default: ''
    },
    timeStamp: {
        type: Date,
        default: Date.now // Default to current date and time
    }
})
const Booking = mongoose.model('bookings', bookingSchema);
export default Booking;