const yargs = require("yargs");
const inquirer = require("inquirer");
const chalk = require("chalk");
const axios = require("axios");
const { signout } = require("./signout.js");
const { directory } = require("./directory.js");

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
        axios({
          method: "post",
          url: "http://localhost:4000/login",
          data: {
            email,
            password,
          },
        }).then((data) => {
          const accessToken = data.data.accessToken;
          const { email, password } = JSON.parse(data.config.data);
          if (!accessToken) {
            console.log(chalk.red("입력한 정보가 잘못되었습니다"));
          } else if (accessToken) {
            console.clear();
            console.log(chalk.bgGreen.black("✔️ 로그인 성공"));
            inquirer
              .prompt([
                {
                  type: "list",
                  name: "choice",
                  message: "✅ 선택해 주세요",
                  choices: [
                    chalk.green("이미지 업로드"),
                    chalk.blue("로그아웃"),
                    chalk.red("회원탈퇴"),
                  ],
                },
              ])
              .then((data) => {
                const { choice } = data;
                if (choice === chalk.red("회원탈퇴")) {
                  console.clear();
                  console.log(chalk.bgRedBright("🔚 회원탈퇴를 진행합니다"));
                  signout(accessToken, email, password);
                } else if (choice === chalk.blue("로그아웃")) {
                  console.clear();
                  console.log(chalk.bgGreen.black("✔️ 로그아웃 성공"));
                } else if (choice === chalk.green("이미지 업로드")) {
                  console.clear();
                  console.log("imeage 업로드를 시작합니다.");
                  directory(email);
                }
              });
          }
        });
      });
  },
};
