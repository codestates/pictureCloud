const inquirer = require("inquirer");
const chalk = require("chalk");
const axios = require("axios");

module.exports = {
  signout: (accessToken, email) => {
    inquirer
      .prompt([
        {
          type: "list",
          name: "choice",
          message: "탈퇴하시겠습니까?",
          choices: [chalk.red("탈퇴"), chalk.blue("취소")],
        },
      ])
      .then((data) => {
        const { choice } = data;
        if (choice === chalk.red("탈퇴")) {
          axios
            .delete(
              "http://ec2-52-78-182-60.ap-northeast-2.compute.amazonaws.com/signout",
              {
                data: {
                  email: email,
                },
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
                console.log("✅  탈퇴되었습니다.");
              } else {
                console.log("❗️ 탈퇴에 실패했습니다.");
              }
            });
        }
        if (choice === chalk.blue("취소")) {
          console.log("✅  취소되었습니다.");
        }
      });
  },
};
