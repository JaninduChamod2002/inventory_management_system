// Importing necessary modules
import express from "express";
import mongoose from "mongoose";
import cors from 'cors';

// Importing custom configurations
import { PORT, mongoDBURL } from './config.js';


// Importing model and routes


import Customer_Route from './Routes/Customer_Route.js'


// Creating an instance of the Express application
const app = express();


// Middleware for parsing request body
app.use(express.json());


app.use(cors());




app.use('/customers', Customer_Route);


mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

  