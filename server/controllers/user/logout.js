module.exports = (req, res) => {
  res.clearCookie("jwt").status(205).send("ok");
};
