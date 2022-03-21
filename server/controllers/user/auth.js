const { isAuthorized } = require("../tokenFunctions");
const { user } = require("../../models");

module.exports = (req, res) => {
  const accessTokenData = isAuthorized(req);
  if (!accessTokenData) {
    return res.status(401).send({ data: null, message: "Invailed token" });
  }
  const { email } = accessTokenData;

  user
    .findOne({ where: { email } })
    .then((data) => {
      if (!data) {
        return res.json({
          data: null,
          message: "Invailed token",
        });
      }
      delete data.dataValues.password;
      return res
        .status(200)
        .json({ data: { userInfo: data.dataValues }, message: "ok" });
    })
    .catch((err) => {
      return res.status(500).send("Interner server Error");
    });
};
