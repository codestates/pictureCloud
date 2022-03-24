const { board } = require("../../models");
const { isAuthorized } = require("../tokenFunctions");

module.exports = (req, res) => {
  const accessTokenData = isAuthorized(req);
  const { description, hint } = req.body;

  if (accessTokenData === null) {
    return res.status(401).send({ data: null, message: "Invaild token" });
  }

  board.create({
    userId: accessTokenData.id,
    description,
    hint,
  });
  return res.status(201).send({
    // boardId: id,
    userId: accessTokenData.id,
    description: description,
    hint: hint,
  });
};
