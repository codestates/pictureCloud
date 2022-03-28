const yargs = require("yargs");
const inquirer = require("inquirer");
const chalk = require("chalk");
const axios = require("axios");

module.exports = {
  signout: (accessToken) => {
    inquirer
      .prompt([
        {
          type: "list",
          name: "choice",
          message: "탈퇴 하시겠습니까?",
          choices: [chalk.red("탈퇴"), chalk.blue("취소")],
        },
      ])
      .then((data) => {
        const { choice } = data;
        if (choice === chalk.red("탈퇴")) {
          axios({
            method: "delete",
            url: "http://localhost:4000/signout",
            data: {
              accessToken,
            },
          }).then((data) => {
            const message = data.data.message;
            if (message === "ok") {
              console.log("탈퇴되었습니다.");
            }
            // ?? 탈퇴에 실패할경우를 넣어야하나?
            else {
              console.log("탈퇴에 실패했습니다.");
            }
          });
        }
        if (choice === chalk.blue("취소")) {
          console.log("취소 되었습니다.");
        }
      });
  },
};
