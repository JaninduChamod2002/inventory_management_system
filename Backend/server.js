
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
//import errorHandler from "./middleware/errorMiddleware.js";
// import cookieParser from "cookie-parser";
import EmployeeRoute from './routes/EmployeeRoute.js';
import employeeAttendanceRoute from './routes/employeeAttendanceRoute.js';
import Return_Route from './routes/Return_Route.js';
import Customer_Route from './routes/Customer_Route.js';

// Initialize Express app
const app = express();
app.use(cors({ origin: 'http://localhost:5173' }));
// Define port
const PORT = process.env.PORT || 8090; // Default port or port defined in environment variable

// Load environment variables from config file
//dotenv.config({path: "./config.env" });

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded bodies
app.use(bodyParser.json()); // Parse JSON bodies using body-parser middleware

// Routes middlewares
app.use('/employees', EmployeeRoute); // Mount employee-related routes
app.use('/EmployeeAttendence', employeeAttendanceRoute); // Mount employee attendance-related routes
app.use('/returns', Return_Route); // Mount return-related routes
app.use('/customers', Customer_Route); // Mount customer-related routes
//app.use('/', posRoute); // Mount POS-related routes
//app.use('/api/category', categoryRoute); // Mount category-related routes
//app.use('/api/items', itemRoute); // Mount item-related routes

// Default route
app.get('/', (req, res) => {
  res.send('Home Page'); // Send response for the home page route
});

// Error middleware
//app.use(errorHandler); // Mount the error handler middleware

// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGO_URI) // Connect to MongoDB using the URI from environment variable
  .then(() => {
    console.log('DB Connection Successful!'); // Log successful database connection
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`); // Log server start
    });
  })
  .catch((err) => console.log(err)); // Log any errors during database connection
