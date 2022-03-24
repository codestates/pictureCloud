const { board } = require("../../models");
const { isAuthorized } = require("../tokenFunctions");

module.exports = (req, res) => {
  const accessTokenData = isAuthorized(req);
  const { boardId } = req.params;

  if (accessTokenData === null) {
    return res.status(401).send({ data: null, message: "Invaild token" });
  }

  board.findOne({
    where: { id: boardId },
  });
  return res.status(200).send({
    boardId: boardId,
    // userId: ?
    // description: description,
    // hint: hint,
  });
};
