const inquirer = require("inquirer");
const chalk = require("chalk");
const axios = require("axios");
const { login } = require("./login");

module.exports = {
  singup: () => {
    console.log(chalk.bgYellowBright.black("π  νμκ°μμ μ§νν©λλ€."));
    inquirer
      .prompt([
        {
          type: "input",
          name: "username",
          message: "π  μ΄λ¦μ μλ ₯ν΄μ£ΌμΈμ: ",
        },
        {
          type: "input",
          name: "email",
          message: "π  μ΄λ©μΌμ μλ ₯ν΄μ£ΌμΈμ: ",
        },
        {
          type: "password",
          name: "password",
          message: "π  λΉλ°λ²νΈλ₯Ό μλ ₯ν΄μ£ΌμΈμ: ",
          mask: function (input) {
            return "β" + new Array(String(input).length).join("β");
          },
        },
      ])
      .then((answers) => {
        const { username, email, password } = answers;
        axios
          .post(
            "http://ec2-52-78-182-60.ap-northeast-2.compute.amazonaws.com/signup",
            {
              username,
              email,
              password,
            }
          )
          .then((data) => {
            if (
              data.data.message ===
              "You are currently using your email and username."
            ) {
              console.log("βοΈ usernameκ³Ό emailμ΄ μ¬μ©μ€μλλ€.");
              console.log(chalk.red("νμκ°μμ μ€ν¨νμ¨μ΅λλ€."));
            } else if (
              data.data.message ===
              "The email address you requested is currently in use."
            ) {
              console.log("βοΈ emailμ΄ μ¬μ©μ€μλλ€.");
              console.log(chalk.red("νμκ°μμ μ€ν¨νμ¨μ΅λλ€."));
            } else if (
              data.data.message ===
              "The username you requested is currently in use."
            ) {
              console.log("βοΈ usernameμ΄ μ¬μ©μ€μλλ€.");
              console.log(chalk.red("νμκ°μμ μ€ν¨νμ¨μ΅λλ€."));
            } else if (data.data.message === "ok") {
              console.clear();
              console.log(chalk.bgBlueBright("π‘ νμκ°μ μ±κ³΅"));
              login();
            }
          });
      });
  },
};
