import express, { request } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from './models/bookModel.js';
import bookRoute from './routes/booksroutes.js';
import cors from 'cors';

const app = express();

//Middleware for parsing request body
app.use(express.json());

//Middleware for handling CORS POLICY
//option 1: Allow All Origins with Default cors(*)
app.use(cors({
    origin: [
        "https://library-management-app-brown.vercel.app", 
        "https://library-management-cn0w6owri-siddhant-janbandhus-projects.vercel.app"
    ], // Allow both origins
    methods: ["POST", "GET", "PUT", "DELETE"], // Allowed HTTP methods
    credentials: true, // Allow cookies to be sent
}));


//Option 2: Allow Custom Origins
// app.use(
//     cors({
//         origin: 'http://localhost:3000',
//         methods: ['Get', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type'],
//     })
// );

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome To MERN Stack')
});

app.use('/books', bookRoute);




mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`App is Listening to port: ${PORT}`);
        });
    }).catch((error) => {
        console.log(error);
    });
