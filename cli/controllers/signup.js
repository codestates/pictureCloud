const yargs = require("yargs");
const inquirer = require("inquirer");
const chalk = require("chalk");
const axios = require("axios");

module.exports = {
  singup: () => {
    console.log(chalk.bgYellowBright.black("🙌  회원가입을 진행합니다."));
    inquirer
      .prompt([
        {
          type: "input",
          name: "username",
          message: "🚧  이름을 입력해 주세요: ",
        },
        {
          type: "input",
          name: "email",
          message: "🚧  이메일을 입력해주세요: ",
        },
        {
          type: "password",
          name: "password",
          message: "🚧  비밀번호를 입력해 주세요: ",
          mask: function (input) {
            return "█" + new Array(String(input).length).join("█");
          },
        },
      ])
      // .then((answers) => {
      //  ! advenced 유효성 검사
      //  const namePattern = /^[가-힣a-zA-Z]+$/; // 이름유효성 검사 한글 영문만 입력가능

      //  const emailPattern =
      //   /^[0-9a-zA-Z]([-\_]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-\_]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i; // email 유효성 검사

      //  const passwordPattern =
      //   /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/; // 비밀번호 유효성 검사
      // })
      .then((answers) => {
        const { username, email, password } = answers;
        axios
          .post("http://localhost:4000/signup", {
            username,
            email,
            password,
          })
          .then((data) => {
            if (data.data.message === 'You are currently using your email and username.') {
              console.log('username과 email이 사용중입니다.')
              console.log(chalk.red("회원가입에 실패 하셨습니다."));
            } else if (data.data.message === 'The email address you requested is currently in use.') {
              console.log('email이 사용중입니다.')
              console.log(chalk.red("회원가입에 실패 하셨습니다."));
            } else if (data.data.message === 'The username you requested is currently in use.') {
              console.log('username이 사용중입니다.')
              console.log(chalk.red("회원가입에 실패 하셨습니다."));
            } else if (data.data.message === 'ok') {
              console.clear()
              console.log(chalk.blue("✅ 회원가입 성공"));
            }
          });
      });
  },
};
