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

const app = express();

const PORT = process.env.PORT || 9000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({
  origin: ["http://localhost:9000", "https://inventory-management-system.vercel.app"],
  credentials: true,
}));

// Routes middlewares
app.use('/employees', EmployeeRoute);
app.use('/attendants', employeeAttendanceRoute);

// Routes 
app.get("/", (req, res) => {
  res.send("Home Page");
});

// Error middleware 
// app.use(errorHandler);

// Connect to DB and start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
