require("dotenv").config();

const express = require("express");
const app = express();
const connectdb = require("./connection");
const urlroute = require("./routes/url");
const userroute = require("./routes/user");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const url = process.env.MONGO_URI;

app.use(express.json());
connectdb(url).then(() => {
  console.log("database connected");
});

app.use(cookieParser());

app.use("/url", urlroute);
app.use("/user", userroute);

app.listen(process.env.PORT || 3000, () => {
  console.log("port is running on 3000");
});
