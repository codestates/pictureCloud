const yargs = require("yargs");
const inquirer = require("inquirer");
const chalk = require("chalk");
const axios = require("axios");
const { signout } = require("./signout.js");
const { directory } = require("./directory.js");

module.exports = {
  // *로그인*
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
          type: "input",
          name: "password",
          message: "🔐 password: ",
        },
      ])
      .then((answers) => {
        const { email, password } = answers;
        // const accessToken = answers;
        // console.log(answers);
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
            console.log(chalk.red("회원가입좀..")); // !! 회원정보가 없는데 로그인 시도할경우 console이 찍히지않음 에러는 회원가입 중복과 동일하게 뜸
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
                  directory();
                }
              });
          }
        });
      });
  },
};
