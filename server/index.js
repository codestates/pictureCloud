require("dotenv").config();
const fs = require("fs");
const https = require("https");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const controllers = require("./controllers");

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

// user
app.get("/auth", controllers.auth);
app.post("/login", controllers.login);
app.post("/logout", controllers.logout);
app.post("/signup", controllers.signup);
app.delete("/signout", controllers.signout);

// board
app.get("/board", controllers.mainboard);
app.get("/board/:boardId", controllers.mainboarddetail);
app.post("/board/add", controllers.createboard);
app.patch("/board/update/:userId/:boardId", controllers.updateboard);
app.delete("/board/:userId/:boardId", controllers.deleteboard);

const HTTPS_PORT = process.env.HTTPS_PORT || 4000;

app.listen(HTTPS_PORT, () => console.log("server open"));
