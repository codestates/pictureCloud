#!/usr/bin/env node

const commander = require("commander");
const chalk = require("chalk");
const axios = require("axios");
const inquirer = require("inquirer");
const { signout } = require("./signout.js");
const { directory } = require("./directory.js");
const { imageDownload } = require("./imageDownload.js");

console.clear();
const program = new commander.Command();
const user = program
  .command("signout")
  .description("회원탈퇴를 진행하기 위한 명령어");
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
        .post(
          "http://ec2-52-78-182-60.ap-northeast-2.compute.amazonaws.com/login",
          {
            email: email,
            password: password,
          }
        )
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

const user2 = program
  .command("image")
  .description("이미지 업로드를 진행하기 위한 명령어");
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
        .post(
          "http://ec2-52-78-182-60.ap-northeast-2.compute.amazonaws.com/login",
          {
            email: email,
            password: password,
          }
        )
        .then((data) => {
          const message = data.data.message;
          if (message === "ok") {
            console.log(
              chalk.bgBlueBright.black("📤  imeage 업로드를 시작합니다.")
            );
            directory(email);
          } else {
            console.log(chalk.red("입력한 정보가 잘못되었습니다"));
          }
        });
    });
});

const user3 = program
  .command("download")
  .description("이미지 다운로드를 진행하기 위한 명령어");
user3.action((cmd, args) => {
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
          const message = data.data.message;
          if (message === "ok") {
            console.log(
              chalk.bgCyanBright.black("📸  imeage 다운로드를 시작합니다.")
            );
            imageDownload(email);
          } else {
            console.log(chalk.red("입력한 정보가 잘못되었습니다"));
          }
        });
    });
});

program.parse(process.argv);
