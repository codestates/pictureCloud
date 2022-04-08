const { user, image } = require("../../models");
const { isAuthorized } = require("../tokenFunctions");

module.exports = (req, res) => {
  const { email } = req.body;

  try {
    const accessTokenData = isAuthorized(req);
    if (accessTokenData === null) {
      res.status(401).json({
        message: "Invaild token",
      });
    } else {
      user.destroy({
        where: { email },
      });
      image.destroy({
        where: { email },
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
