const { user } = require("../../models");
const crypto = require("crypto");

module.exports = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(422)
      .send("please input your username or email or password");
  }

  const userData1 = await user.findOne({ where: { email } });
  const userData2 = await user.findOne({ where: { username } });

  if (userData1 && userData2) {
    return res
      .status(202)
      .json({ message: "You are currently using your email and username." });
  } else if (userData1) {
    return res.status(202).json({
      message: "The email address you requested is currently in use.",
    });
  } else if (userData2) {
    return res
      .status(202)
      .json({ message: "The username you requested is currently in use." });
  } else {
    const createSalt = () => crypto.randomBytes(32).toString("hex");

    const createHashedPassword = (password) => {
      const salt = createSalt();

      const hashedPassword = crypto
        .pbkdf2Sync(password, salt, 1, 32, "sha512")
        .toString("hex");
      return { hashedPassword, salt };
    };

    const { hashedPassword, salt } = createHashedPassword(password);

    user
      .create({
        email,
        username,
        password: hashedPassword,
        salt,
      })
      .then((data) => {
        delete data.dataValues.password;
        delete data.dataValues.salt;
        res.status(201).json({ message: "ok" });
      })
      .catch((err) => {
        return res.status(500).send("err");
      });
  }
};
