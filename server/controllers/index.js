module.exports = {
  login: require("./user/login"),
  logout: require("./user/logout"),
  signup: require("./user/signup"),
  signout: require("./user/signout"),
  imagetable: require("./s3/imagetable"),
  imageUrl: require("./s3/imageUrl"),
  render: require("./s3/render"),
  getRender: require("./s3/getRender"),
  resetRender: require("./s3/resetRender"),
  changePassword: require("./user/changePassword"),
  getInfo: require("./s3/getInfo"),
};
