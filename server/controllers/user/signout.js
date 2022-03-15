const { user } = require("../../models");
const { isAuthorized } = require("../tokenFunctions");

module.exports = (req, res) => {
  const accessTokenData = isAuthorized(req);
  // console.log(req.headers);
  // console.log(accessTokenData);

  if (accessTokenData === null) {
    return res.status(401).send({ data: null, message: "not authorized" });
  }
  const { email } = req.body;

  user
    .findOne({
      where: { email },
    })
    .then((data) => {
      user.destroy({
        where: { email },
      });
    });
  return res.status(200).send("successfully signed out");
};
