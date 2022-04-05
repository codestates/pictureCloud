require("dotenv").config();
const fs = require("fs");
const https = require("https");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const controllers = require("./controllers");
const app = express();
const { upload } = require("./config/s3");

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

app.get("/auth", controllers.auth);
app.post("/login", controllers.login);
app.post("/logout", controllers.logout);
app.post("/signup", controllers.signup);
app.patch("/changepassword", controllers.changePassword);
app.delete("/signout", controllers.signout);

// s3
app.post("/upload", upload.single("userImg"), controllers.imagetable);

// image
app.post("/imageurl", controllers.imageUrl);
app.get("/resetrender", controllers.resetRender);
app.post("/render", controllers.render);
app.get("/render", controllers.getRender);

const HTTPS_PORT = process.env.HTTPS_PORT || 4000;

app.listen(HTTPS_PORT, () => console.log("server open"));
