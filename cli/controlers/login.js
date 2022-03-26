const yargs = require("yargs");
const inquirer = require("inquirer");
const chalk = require("chalk");
const axios = require("axios");
const { directory } = require("./directory.js");

module.exports = {
  // *로그인*
  login: () => {
    // TODO: 로그인 axios
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
          if (!data) {
            console.log(chalk.red("회원가입좀.."));
          } else {
            console.log(chalk.blue("✅ 로그인 성공"));
            directory();
          }
          // console.log(data);
        });
        // console.log(answers);
      });
  },
};
