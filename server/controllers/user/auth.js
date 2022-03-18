const { isAuthorized } = require("../tokenFunctions");
const { user } = require("../../models");

module.exports = (req, res) => {
  const accessTokenData = isAuthorized(req);
  // console.log("여기여기", accessTokenData);
  if (!accessTokenData) {
    return res.status(401).send({ data: null, message: "unauthorized user" });
  }
  const { email } = accessTokenData;

  user
    .findOne({ where: { email } })
    .then((data) => {
      if (!data) {
        return res.json({
          data: null,
          message: "not authorized",
        });
      }
      delete data.dataValues.password;
      return res
        .status(200)
        .json({ data: { userInfo: data.dataValues }, message: "ok" });
    })
    .catch((err) => {
      return res.status(500).send("err");
    });
};
