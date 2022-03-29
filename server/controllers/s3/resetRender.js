const { image } = require("../../models");

module.exports = (req, res) => {
  image
    .update(
      {
        render: "false",
      },
      { where: { render: "true" } },
    )
    .then((data) => {
      return res.status(201).send({
        message: "ok",
      });
    });
};
