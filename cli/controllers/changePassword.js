const inquirer = require("inquirer");
const chalk = require("chalk");
const axios = require("axios");

module.exports = {
  changePassword: (accessToken) => {
    inquirer
      .prompt([
        {
          type: "password",
          name: "password",
          message: "π λ³κ²½νμ€ λΉλ°λ²νΈλ₯Ό μλ ₯ν΄μ£ΌμΈμ :",
          mask: function (input) {
            return "β" + new Array(String(input).length).join("β");
          },
        },
        {
          type: "list",
          name: "choice",
          message: "λΉλ°λ²νΈλ₯Ό λ³κ²½νμκ² μ΅λκΉ?",
          choices: [chalk.green("μ"), chalk.red("μλμ")],
        },
      ])
      .then((data) => {
        const { choice, password } = data;
        if (choice === chalk.green("μ")) {
          axios
            .patch(
              "http://ec2-52-78-182-60.ap-northeast-2.compute.amazonaws.com/changepassword",
              {
                password: password,
              },
              {
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
                console.log("β  λΉλ°λ²νΈκ° λ³κ²½λμμ΅λλ€.");
              } else {
                console.log("βοΈ  λΉλ°λ²νΈ λ³κ²½μ μ€ν¨νμμ΅λλ€.");
              }
            });
        } else if (choice === chalk.red("μλμ")) {
          console.log("β  μ·¨μλμμ΅λλ€.");
        }
      });
  },
};
