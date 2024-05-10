const express = require("express");
const cors = require("cors");
const bodyParser=require("body-parser");
const mongoose = require('mongoose');
const dotenv=require("dotenv");
const app=express();
require('dotenv').config();

const PORT = process.env.PORT || 8090;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(process.env.MONGODB_URL|| URL);


const connection= mongoose.connection;
connection.once('open', () => {
         console.log("Mongodb connection successfully !!");
})

const purchaseStatusRoute = require("./routes/purchaseStatusRoute");
app.use("/api/orderStatus",purchaseStatusRoute);
const purchaseRoute = require("./routes/purchaseRoute");
app.use("/api/order",purchaseRoute);

app.listen(PORT, () => {
console.log(`Server is running on port: ${PORT}`);
});
app.use(bodyParser.json(), (err, req, res, next) => {
    if (err instanceof SyntaxError) {
        res.status(400).json({ message: "Invalid JSON syntax" });
    } else {
        next();
    }
});
