module.exports = {
  auth: require("./user/auth"),
  login: require("./user/login"),
  logout: require("./user/logout"),
  signup: require("./user/signup"),
  signout: require("./user/signout"),
  uploadS3: require("./s3/uploadS3"),
  image: require("./s3/image"),
  render: require("./s3/render"),
  getRender: require("./s3/getRender"),
  resetRender: require("./s3/resetRender"),
};
