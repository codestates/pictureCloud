const { user } = require("../../models");
const crypto = require("crypto");
const { isAuthorized } = require("../tokenFunctions/index");

module.exports = (req, res) => {
  const accessToken = isAuthorized(req);
  const { email } = accessToken;
  const { password } = req.body;

  if (accessToken === null) {
    return res.status(401).send({ data: null, message: "not authorized" });
  }

  // salt 생성
  const createSalt = () => crypto.randomBytes(32).toString("hex");

  // password 해싱 함수
  const createHashedPassword = (password) => {
    const salt = createSalt();

    const hashedPassword = crypto
      .pbkdf2Sync(password, salt, 1, 32, "sha512")
      .toString("hex");
    return { hashedPassword, salt };
  };

  const { hashedPassword, salt } = createHashedPassword(password);

  user
    .update(
      {
        password: hashedPassword,
        salt,
      },
      { where: { email: email } },
    )
    .then((data) => {
      return res.status(201).send({
        message: "ok",
      });
    });
};
