const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const userRoute = require("./routes/userRoute");
const categoryRoute = require("./routes/categoryRoute");
const itemRoute = require("./routes/itemRoute");
const CusRoute = require("./routes/customerRoute");

const errorHandler = require("./middleware/errorMiddleware");

const app = express();

const PORT = process.env.PORT || 8090;

dotenv.config({ path: "./.env" });

const customerRoute = require("./routes/customerRoute.js")

// Middleware

app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes middlewares
app.use("/api/users", userRoute);
app.use("/api/category", categoryRoute);
app.use("/api/items", itemRoute);
app.use('/customer', CusRoute);

// Routes
app.get("/", (req, res) => {
  res.send("Home Page");
});
// error middleware

app.use(errorHandler);

// connect to DB and start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DB Connection Successful!");
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })

  .catch((err) => console.log(err));

  app.use('/customer', customerRoute)
