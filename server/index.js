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

// recipe openApi
// app.get("/api", controllers.recipe);

// user
// app.get("/auth", controllers.auth);
// app.post("/login", controllers.login);
// app.post("/logout", controllers.logout);
// app.post("/signup", controllers.signup);
// app.delete("/signout", controllers.signout);
// app.post("/callback", controllers.google);

// food
// app.post("/food", controllers.createFood);
// app.patch("/food", controllers.updateFood);
// app.delete("/food", controllers.deleteFood);

// myfrigo
// app.get("/myfrigo", controllers.myfrigoFood);
// app.patch("/mypage/:id", controllers.updateMypage);

// post
// app.get("/post", controllers.getPost);
// app.post("/post", controllers.createPost);
// app.post("/quickpost", controllers.createPost);
// app.patch("/post/:id", controllers.updatePost);
// app.delete("/post/:id", controllers.deletePost);
// app.post("/post/:postId/:plusOrMinus", controllers.like);

//comment
// app.post("/comment/:id", controllers.createComment);
// app.patch("/comment/:commentId", controllers.updateComment);
// app.delete("/comment/:postId/:commentId", controllers.deleteComment);
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

// s3
app.post("/upload", upload.single("userImg"), controllers.uploadS3);
// upload.single("profile_picture"); // "파일명"
// upload.array("profile_picture", 5), //이미지 최대 수를 입력
//   upload.fields([
//     { name: "profile_picture", maxCount: 1 },
//     { name: "company_pictures", maxCount: 5 },
//   ]);

const HTTPS_PORT = process.env.HTTPS_PORT || 4000;
// let server;
// if (fs.existsSync("./key.pem") && fs.existsSync("./cert.pem")) {
//   const privateKey = fs.readFileSync(__dirname + "/key.pem", "utf8");
//   const certificate = fs.readFileSync(__dirname + "/cert.pem", "utf8");
//   const credentials = { key: privateKey, cert: certificate };

//   server = https.createServer(credentials, app);
//   server.listen(HTTPS_PORT, () => console.log("https server runnning"));
// } else {
// server = app.listen(HTTPS_PORT, () => console.log("server open"));
// }
// module.exports = server;
app.listen(HTTPS_PORT, () => console.log("server open"));
