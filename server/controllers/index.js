module.exports = {
  auth: require("./user/auth"),
  login: require("./user/login"),
  logout: require("./user/logout"),
  signup: require("./user/signup"),
  signout: require("./user/signout"),
  uploadS3: require("./s3/uploadS3"),
};
