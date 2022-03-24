const { board } = require("../../models");
const { isAuthorized } = require("../tokenFunctions");

module.exports = (req, res) => {
  const accessTokenData = isAuthorized(req);

  if (accessTokenData === null) {
    return res.status(401).send({ data: null, message: "Invaild token" });
  }

  board.findAll().then((data) => {
    const boardList = data.map((item) => {
      const board = item.dataValues;
      return board;
    });
  });
  return res.status(201).send("ok");
};
