require("dotenv").config();
const fs = require("fs");
const https = require("https");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
// const controllers = require("./controllers");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE"],
  }),
);

app.use(cookieParser());

app.get("/", (req, res) => {
  return res.send("Hello");
});

const HTTPS_PORT = process.env.HTTPS_PORT || 4000;

app.listen(HTTPS_PORT, () => console.log("server open"));
