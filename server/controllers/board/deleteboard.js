const { board } = require("../../models");
const { isAuthorized } = require("../tokenFunctions");

module.exports = (req, res) => {
  const accessTokenData = isAuthorized(req);
  const { userId, boardId } = req.params;

  if (accessTokenData === null) {
    return res.status(401).send({ data: null, message: "Invaild token" });
  }

  board.destroy({ where: { id: boardId } });
  return res.status(201).send("ok");
};
