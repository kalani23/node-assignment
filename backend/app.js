const express = require("express");
const app = express();
const errorMiddleware = require("./middlewares/errors");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());
//Import all the routes
const products = require("./routes/product");

app.use("/api", products);

app.use(errorMiddleware);

module.exports = app;
