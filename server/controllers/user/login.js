const { user } = require("../../models");
const crypto = require("crypto");
const { generateAccessToken, sendAccessToken } = require("../tokenFunctions");

module.exports = async (req, res) => {
  const { email, password } = req.body;
  //hash된 비밀번호 생성
  const makeHashedPassword = (email, password) =>
    new Promise(async (resolve, reject) => {
      const salt = await user
        .findOne({
          attributes: ["salt"],
          raw: true,
          where: {
            email,
          },
        })
        .then((result) => {
          if (!result) {
            return "";
          }
          console.log("result:", result.salt);
          return result.salt;
        });
      crypto.pbkdf2(password, salt, 1, 32, "sha512", (err, key) => {
        if (err) reject(err);
        resolve(key.toString("hex"));
      });
    });
  //해쉬된 비밀번호
  const hashedPassword = await makeHashedPassword(email, password);

  user
    .findOne({
      where: {
        email,
        password: hashedPassword,
      },
    })
    .then((data) => {
      if (!data) {
        return res.status(202).json({ message: "invalid token" });
      } else {
        delete data.dataValues.password;
        delete data.dataValues.salt;
        const accessToken = generateAccessToken(data.dataValues);
        sendAccessToken(res, accessToken);
        res.status(200).json({ accessToken: accessToken, message: "ok" });
      }
    })
    .catch((err) => {
      return res.status(500).send("Interner server Error");
    });
};
