require("dotenv").config();
require("express-async-errors");

const express = require("express");
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const connectDB = require("./db/connectDB");
const router = require("./routes/products");

const app = express();

// routes
app.get("/", (req, res) => {
  res.send("<h1>Store API</h1><a href='/api/v1/products'>products</a>");
});
app.use("/api/v1/products", router);

// middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server starting on PORT ${port}...`));
  } catch (err) {
    console.log(err);
  }
};

start();
