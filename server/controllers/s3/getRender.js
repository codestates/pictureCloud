const { image } = require("../../models");

module.exports = (req, res) => {
  let pageNum = req.query.page;
  let offset = 0;

  if (pageNum > 1) {
    offset = 10 * (pageNum - 1);
  }

  image
    .findAll({
      offset: offset,
      limit: 10,
      where: { render: "true" },
    })
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
