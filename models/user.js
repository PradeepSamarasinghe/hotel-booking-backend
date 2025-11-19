import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email : {
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: true
    },
    firstname : {
        type: String,
        required: true
    },
    lastName : {
        type: String,
        required: true
    },
    type : {
        type: String,
        required: true,
        default: 'customer' // Default type is 'customer'
    },
    whatsapp : {
        type: String,
        required: true
    },
    phone : {
        type: String,
        required: true
    },
    disable : {
        type: Boolean,
        default: false, // Default value for disable is false
        required: false
    },
    emailVerified : {
        type: Boolean,
        required: true,
        default: false // Default value for emailVerified is false
    }

})

const User = mongoose.model('users', userSchema);
export default User;