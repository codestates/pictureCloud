const inquirer = require("inquirer");
const chalk = require("chalk");
const axios = require("axios");
const { login } = require("./login");

module.exports = {
  singup: () => {
    console.log(chalk.bgYellowBright.black("🙌  회원가입을 진행합니다."));
    inquirer
      .prompt([
        {
          type: "input",
          name: "username",
          message: "🚧  이름을 입력해주세요: ",
        },
        {
          type: "input",
          name: "email",
          message: "🚧  이메일을 입력해주세요: ",
        },
        {
          type: "password",
          name: "password",
          message: "🚧  비밀번호를 입력해주세요: ",
          mask: function (input) {
            return "█" + new Array(String(input).length).join("█");
          },
        },
      ])
      .then((answers) => {
        const { username, email, password } = answers;
        axios
          .post("http://localhost:4000/signup", {
            username,
            email,
            password,
          })
          .then((data) => {
            if (
              data.data.message ===
              "You are currently using your email and username."
            ) {
              console.log("username과 email이 사용중입니다.");
              console.log(chalk.red("회원가입에 실패하셨습니다."));
            } else if (
              data.data.message ===
              "The email address you requested is currently in use."
            ) {
              console.log("email이 사용중입니다.");
              console.log(chalk.red("회원가입에 실패하셨습니다."));
            } else if (
              data.data.message ===
              "The username you requested is currently in use."
            ) {
              console.log("username이 사용중입니다.");
              console.log(chalk.red("회원가입에 실패하셨습니다."));
            } else if (data.data.message === "ok") {
              console.clear();
              console.log(chalk.blue("✅ 회원가입 성공"));
              login();
            }
          });
      });
  },
};
