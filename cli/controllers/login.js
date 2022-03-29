const inquirer = require("inquirer");
const chalk = require("chalk");
const axios = require("axios");
const { select } = require("./select")

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
        axios({
          method: "post",
          url: "http://localhost:4000/login",
          data: {
            email,
            password,
          },
        }).then((data) => {
          const accessToken = data.data.accessToken;
          const { email } = JSON.parse(data.config.data);
          if (!accessToken) {
            console.log(chalk.red("회원가입좀..")); // !! 회원정보가 없는데 로그인 시도할경우 console이 찍히지않음 에러는 회원가입 중복과 동일하게 뜸
          } else if (accessToken) {
            console.clear();
            console.log(chalk.bgGreen.black("✔️ 로그인 성공"));
            select(accessToken, email)
            //도르마무 실패.
          }
        });
      });
  },
};
