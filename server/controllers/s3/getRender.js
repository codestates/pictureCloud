const { image } = require("../../models");

module.exports = (req, res) => {
  image
    .findAll({ where: { render: "true" } })
    .then((data) => {
      const imageUrl = data.map((item) => {
        const renderTrue = item.dataValues.image;
        return renderTrue;
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
