const { user } = require("../../models");
const crypto = require("crypto");
const { generateAccessToken, sendAccessToken } = require("../tokenFunctions");

module.exports = async (req, res) => {
  const { email, password } = req.body;

  // DB에 있는 salt를 가져와서 password 해싱
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
        .then((result) => result.salt);
      // console.log("여기", salt);
      crypto.pbkdf2(password, salt, 1, 32, "sha512", (err, key) => {
        if (err) reject(err);
        resolve(key.toString("hex"));
      });
    });

  const hashedPassword = await makeHashedPassword(email, password);
  // console.log(`hasedPassword = ${hashedPassword}`);

  user
    .findOne({
      where: {
        email,
        password: hashedPassword,
      },
    })
    .then((data) => {
      // console.log("여기", data);
      if (!data) {
        return res.status(401).send("invalid authorized");
      } else {
        delete data.dataValues.password;
        const accessToken = generateAccessToken(data.dataValues);
        sendAccessToken(res, accessToken);
        res.status(200).json({ accessToken: accessToken, message: "ok" });
      }
    })
    .catch((err) => {
      return res.status(500).send("err");
    });
};
