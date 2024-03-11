const dotenv = require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const userRoute = require("./routes/userRoute");
const errorHandler = require("./middleware/errorMiddleware");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();

const PORT =process.env.PORT || 9000;


// Middleware

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({origin: ["http://localhost:9000", "https://inventory-management-system.vercel.app"],
credentials: true,
}));

// Routes middlewares
app.use("/api/users", userRoute);

// Routes 
app.get("/", (req, res ) => {res.send("Home Page");
  });
// error middleware 

app.use(errorHandler);

// connect to DB and start server
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
    });
    })
    
    .catch((err) => console.log(err));