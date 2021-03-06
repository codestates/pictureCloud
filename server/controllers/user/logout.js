const { isAuthorized } = require("../tokenFunctions");

module.exports = async (req, res) => {
  const userInfo = isAuthorized(req);

  if (!userInfo) {
    res.status(401).json({
      message: "not logined",
    });
  } else {
    try {
      return res.clearCookie("jwt").status(200).json({
        message: "ok",
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }
};
