#!/usr/bin/env node
// 테스트
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

// const { isDirectory, dirFiles } = require("./function/fileFunctions");

const isDirectory = (path) => {
  return fs.lstatSync(path).isDirectory();
};

const getSuffix = (fileName) => {
  const name = fileName.split(".");
  return name.length > 1 ? name.pop() : "";
};

const filterSuffix = (items, suffix) => {
  suffix = Array.isArray(suffix) ? suffix : [suffix];
  return items.filter(
    (item) => suffix.indexOf(getSuffix(item).toLowerCase()) !== -1
  );
};

const dirFiles = (path, suffix) => {
  const files = fs.readdirSync(path);

  suffix = Array.isArray(suffix) ? suffix : [suffix];

  if (suffix) {
    return filterSuffix(files, suffix);
  } else {
    return files;
  }
};

const InputFormats = {
  JPG: "jpg",
  JPEG: "jpeg",
  TIFF: "tiff",
  PNG: "png",
  SVG: "svg",
  WEBP: "webp",
  BITMAP: "bmp",
  PDF: "pdf",
};

const INPUT_FORMATS = Object.keys(InputFormats).map((key) => InputFormats[key]);

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

    const directory = () => {
      // 영광님 이미지 저장 작업
      inquirer
        .prompt([
          {
            type: "input",
            name: "inputDirPath",
            message: "Directory path:",
          },
        ])
        .then((answers) => {
          if (!isDirectory(answers.inputDirPath)) {
            console.log(chalk.red("Not directory"));
            console.log(chalk.rgb(128, 128, 128)("터미널을 종료합니다."));
          } else {
            const foundImages = dirFiles(answers.inputDirPath, INPUT_FORMATS);
            if (foundImages.length == 0) {
              console.log(chalk.red("Not found image"));
              console.log(chalk.rgb(128, 128, 128)("터미널을 종료합니다."));
            } else {
              const foundFormats = [];
              const inputInfo = Object.keys(InputFormats).reduce(
                (counts, key) => {
                  const fileCount = filterSuffix(
                    foundImages,
                    InputFormats[key]
                  ).length;
                  if (fileCount > 0) {
                    counts.push(`${key}: ${fileCount}`);
                    foundFormats.push({
                      name: `${key} (.${InputFormats[key]})`,
                      value: `${InputFormats[key]}`,
                    });
                  }
                  return counts;
                },
                []
              );
              const msg = `> Number of file found: ${
                foundImages.length
              }\n> ${inputInfo.join(" | ")}`;
              console.log(chalk.green(msg));
              inquirer
                .prompt([
                  {
                    type: "confirm",
                    name: "confirm",
                    message: "저장하시겠습니까?",
                  },
                ])
                .then((answers) => {
                  if (answers.confirm)
                    console.log(chalk.green("저장되었습니다."));
                  console.log(chalk.rgb(128, 128, 128)("터미널을 종료합니다."));
                });
            }
          }
        });
    };

    const page = (menu) => {
      if (menu === "회원 가입 하시겠습니까?") {
        singup();
      } else if (menu === "로그인 하시겠습니까?") {
        login();
      }
    };
  })
  .parse(process.argv);
