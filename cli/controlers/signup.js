const yargs = require("yargs");
const inquirer = require("inquirer");
const chalk = require("chalk");
const axios = require("axios");

module.exports = {
  // *회원가입*
  singup: () => {
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
          type: "input",
          name: "password",
          message: "🚧  비밀번호를 입력해 주세요: ",
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
        console.log(username);
        axios({
          method: "post",
          url: "http://localhost:4000/signup",
          data: {
            username,
            email,
            password,
          },
        }).then((data) => {
          console.log(data);
          if (!data) {
            console.log(chalk.red("회원가입에 실패 하셨습니다."));
          } else {
            console.log(chalk.blue("✅ 회원가입 성공"));
          }
        });
      });
  },
};
