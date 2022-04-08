require("dotenv").config();
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
    origin: ["https://www.picturecloud.shop"],
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE"],
  }),
);
app.use(cookieParser());
app.get("/", (req, res) => {
  return res.send("Hello");
});

app.post("/login", controllers.login);
app.post("/logout", controllers.logout);
app.post("/signup", controllers.signup);
app.patch("/changepassword", controllers.changePassword);
app.delete("/signout", controllers.signout);
app.post("/upload", upload.single("userImg"), controllers.imagetable);
app.post("/imageurl", controllers.imageUrl);
app.get("/resetrender", controllers.resetRender);
app.post("/render", controllers.render);
app.get("/render/:id", controllers.getRender);
app.get("/info", controllers.getInfo);

const HTTPS_PORT = process.env.HTTPS_PORT || 4000;

app.listen(HTTPS_PORT, () => console.log("server open"));
