const inquirer = require("inquirer");
const chalk = require("chalk");
const axios = require("axios");
const { select } = require("./select");

module.exports = {
  login: () => {
    console.log(chalk.bgYellowBright.black("📲  로그인을 진행합니다."));
    inquirer
      .prompt([
        {
          type: "input",
          name: "email",
          message: "✉️  email: ",
        },
        {
          type: "password",
          name: "password",
          message: "🔐 password: ",
          mask: function (input) {
            return "█" + new Array(String(input).length).join("█");
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
              console.log(chalk.red("입력한 정보가 잘못되었습니다"));
            } else if (accessToken) {
              console.clear();
              console.log(chalk.bgGreen.black("✔️ 로그인 성공"));
              select(accessToken, email);
            }
          });
      });
  },
};
