module.exports = {
  auth: require("./user/auth"),
  login: require("./user/login"),
  logout: require("./user/logout"),
  signup: require("./user/signup"),
  signout: require("./user/signout"),
  createboard: require("./board/createboard"),
  updateboard: require("./board/updateboard"),
  deleteboard: require("./board/deleteboard"),
  mainboard: require("./board/mainboard"),
  mainboarddetail: require("./board/mainboarddetail"),
};
