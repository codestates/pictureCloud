require("dotenv").config();
const { sign, verify } = require("jsonwebtoken");
// const jwt = require('jsonwebtoken');

module.exports = {
  generateAccessToken: (data) => {
    return sign(data, process.env.ACCESS_SECRET, { expiresIn: "6h" });
  },

  sendAccessToken: (res, accessToken) => {
    res.cookie("jwt", accessToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
  },

  isAuthorized: (req) => {
    // const authorization = req;
    const authorization = req.headers.authorization;
    // console.log("여기여기", req.headers);
    // console.log("여기여기여기", authorization);
    if (!authorization) {
      return null;
    }
    // let fakeToken = authorization.split(" ")[0];
    // // console.log('여기여기', fakeToken)
    // const token = fakeToken.slice(4, -1);
    // // console.log('여기여기', token)
    try {
      // let aabbcc = verify(token, process.env.ACCESS_SECRET);
      // console.log('여기여기', aabbcc)
      return verify(authorization, process.env.ACCESS_SECRET);
    } catch (err) {
      // return null if invalid token
      return null;
    }
  },
};
