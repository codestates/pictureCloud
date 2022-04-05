const { sign, verify } = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  generateAccessToken: (data) => {
    return sign(data, process.env.ACCESS_SECRET, { expiresIn: "1d" });
  },

  sendAccessToken: (res, accessToken) => {
    res.cookie("jwt", accessToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
  },

  isAuthorized: (req) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return null;
    }
    try {
      return verify(authorization, process.env.ACCESS_SECRET);
    } catch (err) {
      return null;
    }
  },
};
