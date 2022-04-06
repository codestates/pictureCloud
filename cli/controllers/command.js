#!/usr/bin/env node

const commander = require("commander");
const chalk = require("chalk");
const axios = require("axios");
const inquirer = require("inquirer");

const { signout } = require("./signout.js");
const { directory } = require("./directory.js");

const program = new commander.Command();
const user = program.command("signout");
user.action((cmd, args) => {
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
    .then((data) => {
      const { email, password } = data;
      axios
        .post("http://localhost:4000/login", {
          email: email,
          password: password,
        })
        .then((data) => {
          const accessToken = data.data.accessToken;
          const message = data.data.message;
          if (message === "ok") {
            console.log(chalk.bgRedBright("🔚 회원탈퇴를 진행합니다"));
            signout(accessToken, email);
          } else {
            console.log(chalk.red("입력한 정보가 잘못되었습니다"));
          }
        });
    });
});

const user2 = program.command("image");
user2.action((cmd, args) => {
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
    .then((data) => {
      const { email, password } = data;
      axios
        .post("http://localhost:4000/login", {
          email: email,
          password: password,
        })
        .then((data) => {
          const accessToken = data.data.accessToken;
          const message = data.data.message;
          if (message === "ok") {
            console.log(chalk.bgRedBright("imeage 업로드를 시작합니다."));
            directory(email);
          } else {
            console.log(chalk.red("입력한 정보가 잘못되었습니다"));
          }
        });
    });
});

program.parse(process.argv);
