const { user } = require("../../models");
const crypto = require("crypto");

module.exports = (req, res) => {
  // console.log("여기", req);
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(422)
      .send("please input your username or email or password");
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
  // console.log(
  //   `username: ${username}/ email: ${email}/ password: ${hashedPassword} / salt: ${salt}`,
  // );

  user
    .findOrCreate({
      where: {
        email,
      },
      defaults: {
        username,
        email,
        password: hashedPassword,
        salt,
      },
    })
    .then(([data, created]) => {
      if (!created) {
        return res.status(409).send("already existed email & username");
      } else {
        delete data.dataValues.password;
        res.status(201).json({ message: "ok" });
      }
    })
    .catch((err) => {
      return res.status(500).send("err");
    });
};
