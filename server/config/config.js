require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: "picturecloud-database-01.coiwurq8thkw.ap-northeast-2.rds.amazonaws.com",
    port: 13306,
    dialect: "mysql",
  },
  test: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: "picturecloud-database-01.coiwurq8thkw.ap-northeast-2.rds.amazonaws.com",
    port: 13306,
    dialect: "mysql",
  },
  production: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: "picturecloud-database-01.coiwurq8thkw.ap-northeast-2.rds.amazonaws.com",
    port: 13306,
    dialect: "mysql",
  },
};