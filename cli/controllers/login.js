const inquirer = require("inquirer");
const chalk = require("chalk");
const axios = require("axios");
const { select } = require("./select");

module.exports = {
  login: () => {
    console.log(chalk.bgYellowBright.black("π²  λ‘κ·ΈμΈμ μ§νν©λλ€."));
    inquirer
      .prompt([
        {
          type: "input",
          name: "email",
          message: "βοΈ  email: ",
        },
        {
          type: "password",
          name: "password",
          message: "π password: ",
          mask: function (input) {
            return "β" + new Array(String(input).length).join("β");
          },
        },
      ])
      .then((answers) => {
        const { email, password } = answers;
        axios
          .post(
            "http://ec2-52-78-182-60.ap-northeast-2.compute.amazonaws.com/login",
            {
              email: email,
              password: password,
            }
          )
          .then((data) => {
            const accessToken = data.data.accessToken;
            const { email, password } = JSON.parse(data.config.data);
            if (!accessToken) {
              console.log(chalk.red("μλ ₯ν μ λ³΄κ° μλͺ»λμμ΅λλ€"));
            } else if (accessToken) {
              console.clear();
              console.log(chalk.bgGreen.black("βοΈ λ‘κ·ΈμΈ μ±κ³΅"));
              select(accessToken, email);
            }
          });
      });
  },
};
