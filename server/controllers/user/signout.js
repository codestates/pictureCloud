const { user } = require("../../models");
const { isAuthorized } = require("../tokenFunctions/index");

module.exports = (req, res) => {
  try {
    const accessToken = isAuthorized(req);
    if (!accessToken) {
      res.status(401).json({
        message: "Invaild token",
      });
    } else {
      user.destroy({
        where: {
          email: accessToken.email,
        },
      });
      res.status(200).json({
        message: "ok",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Interner Server Error",
    });
  }
};
