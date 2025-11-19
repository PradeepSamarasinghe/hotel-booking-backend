import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import usersRoute from './routes/usersRoute.js';
import galleryItemRouter from './routes/galleryItemRoute.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


const app = express();

app.use(bodyParser.json());//middleware to parse JSON bodies

//middleware to jwt authontications
app.use((req, res, next) => {

    const token = req.header("Authorization")?.replace("Bearer ", "");

    if(token != null) {
        jwt.verify(token, process.env.JWT_KEY, 
            (err, decoded) => {
                if(decoded) {
                    req.user = decoded; // Attach the decoded user information to the request object
                    next(); // Call the next middleware or route handler
                }else {
                    next()
                }
            }
        )
    }else {
        next(); // If no token is provided, proceed to the next middleware or route handler
    }
})

const connectionString = process.env.MONGODB_URI;

mongoose.connect(connectionString).then(
    () => {
    console.log('Connected to MongoDB');
}
).catch((err) => {
    console.log('Error connecting to MongoDB:', err); 
}
);

app.use('/api/users', usersRoute); // Mount the users router on the /users path
app.use('/api/gallery', galleryItemRouter); // Mount the gallery item router on the /gallery path

app.listen(5000, () => { 
    console.log('Server is running on port 5000');
})