const inquirer = require("inquirer");
const chalk = require("chalk");
const axios = require("axios");

module.exports = {
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
          message: "비밀번호 변경하시겠습니까?",
          choices: [chalk.green("예"), chalk.red("아니요")],
        },
      ])
      .then((data) => {
        const { choice, password } = data;
        if (choice === chalk.green("예")) {
          axios
            .patch(
              "http://localhost:4000/changepassword",
              {
                password: password,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: accessToken,
                },
                withCredentials: true,
              }
            )
            .then((data) => {
              const message = data.data.message;
              if (message === "ok") {
                console.log("변경되었습니다.");
              } else {
                console.log("변경실패했습니다.");
              }
            });
        }
      });
  },
};
