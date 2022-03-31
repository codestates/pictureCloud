const yargs = require("yargs");
const inquirer = require("inquirer");
const chalk = require("chalk");
const axios = require("axios");

module.exports = {
  // TODO: 비밀번호 재설정 구현
  changePassword: (accessToken) => {
    inquirer
      .prompt([
        {
          type: "password",
          name: "password",
          message: "🔐 변경하실 비밀번호를 입력해주세요.",
          mask: function (input) {
            return "█" + new Array(String(input).length).join("█");
          },
        },
        {
          type: "list",
          name: "choice",
          message: "비밀번호 변경 하시겠습니까?",
          choices: [chalk.green("예"), chalk.red("아니요")],
        },
      ])
      .then((data) => {
        const { password } = data;
        if (password === password) {
          axios({
            method: "post",
            url: "http://localhost:4000/changepassword",
            data: {
              accessToken,
              password,
            },
          });
        }
      });
  },
};
