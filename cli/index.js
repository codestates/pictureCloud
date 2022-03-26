#!/usr/bin/env node
const { program } = require("commander");
const yargs = require("yargs");
const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const chalk = require("chalk");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const { singup } = require("./controlers/signup");
const { login } = require("./controlers/login.js");

program
  .action((cmd, args) => {
    if (args.args[0]) {
      console.log(chalk.bold.red("해당 명령어를 찾을 수 없습니다."));
      program.help();
    } else {
      inquirer
        .prompt([
          {
            type: "list",
            name: "picture",
            message: "선택해주세요",
            choices: ["회원 가입 하시겠습니까?", "로그인 하시겠습니까?"],
          },
        ])
        .then((answers) => {
          page(answers.picture);
        });
    }

    const page = (menu) => {
      if (menu === "회원 가입 하시겠습니까?") {
        singup();
      } else if (menu === "로그인 하시겠습니까?") {
        login();
      }
    };
  })
  .parse(process.argv);
