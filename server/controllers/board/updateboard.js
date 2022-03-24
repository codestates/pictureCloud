const { board } = require("../../models");
const { isAuthorized } = require("../tokenFunctions");

module.exports = (req, res) => {
  const accessTokenData = isAuthorized(req);
  const { description, hint } = req.body;
  const { userId, boardId } = req.params;
  console.log(userId, boardId);

  if (accessTokenData === null) {
    return res.status(401).send({ data: null, message: "Invaild token" });
  }

  board.update(
    { description, hint },
    { where: { userId: userId, id: boardId } },
  );
  return res.status(201).send({
    userId: userId,
    boardId: boardId,
    description: description,
    hint: hint,
  });
};
