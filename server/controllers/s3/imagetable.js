const { image } = require("../../models");

module.exports = (req, res) => {
  const { email } = req.body;
  const Img = req.file;

  image.create({
    email: email,
    image: Img.location,
  });

  return res
    .status(201)
    .send({
      data: Img.location,
    })
    .catch((err) => {
      return res.status(500).send("err");
    });
};
