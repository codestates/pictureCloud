const { image } = require("../../models");

module.exports = (req, res) => {
  const { email } = req.body;

  image
    .findAll({ where: { email: email } })
    .then((data) => {
      const imageUrl = data.map((item) => {
        const urlList = item.dataValues.image;
        return urlList;
      });
      if (!data) {
        return res.json({
          data: null,
          message: "Not found image",
        });
      }
      return res.status(201).send(imageUrl);
    })
    .catch((err) => {
      return res.status(500).send("err");
    });
};
