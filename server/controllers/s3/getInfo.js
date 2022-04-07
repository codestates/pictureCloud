const { image } = require("../../models");

module.exports = (req, res) => {
  image
    .findAll({
      where: { render: "true" },
    })
    .then((data) => {
      const userImage = data.map((item) => {
        const renderTrue = item.dataValues.image;
        return renderTrue;
      });

      const userEmail = data.map((item) => {
        const emailTrue = item.dataValues.email;
        return emailTrue;
      });

      const userCreatedAt = data.map((item) => {
        const createdAtTrue = item.dataValues.createdAt;
        return createdAtTrue;
      });

      if (!data) {
        return res.json({
          data: null,
          message: "Not found image",
        });
      }

      return res.status(201).send({
        image: userImage,
        email: userEmail,
        createdAt: userCreatedAt,
      });
    })
    .catch((err) => {
      return res.status(500).send("err");
    });
};
