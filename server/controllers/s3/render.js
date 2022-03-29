const { image } = require("../../models");

module.exports = (req, res) => {
  const { email } = req.body;

  image
    .update(
      {
        render: "true",
      },
      { where: { email: email } },
    )
    .then((data) => {
      return res.status(201).send({
        message: "ok",
      });
    });
};
