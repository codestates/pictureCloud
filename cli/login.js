#!/usr/bin/env node

const { program } = require("commander");
const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const chalk = require("chalk");
const axios = require("axios");
const jwt = require("jsonwebtoken");

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
// INPUT_FORMATS = ['jpg', 'jpeg', 'tiff', 'png', 'svg', 'webp', 'bmp', 'pdf']

// TODO: imagecli -> 회원가입하시겠습니까 or 로그인하시겠습니까.

program
    .action((cmd, args) => {
        // console.log("여기", args.args[0]);
        if (args.args[0]) {
            console.log(chalk.bold.red("해당 명령어를 찾을 수 없습니다."));
            program.help(); // 설명서를 보여주는 옵션. -h나 --help 옵션으로 설명서를 볼 수도 있지만, 이 메서드를 사용해 프로그래밍적으로 표시할 수도 있다.
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

        const singup = () => {
            // TODO: 회원가입 axios
        };



        const login = () => {
            // TODO: 로그인 axios
            inquirer
                .prompt([
                    {
                        type: "input",
                        name: "email",
                        message: "email:"
                    },
                    {
                        type: "input",
                        name: "password",
                        message: "비밀번호를 입력해 주세요:"
                    }
                ])
                .then((answers) => {
                    const { email, password } = answers
                    axios({
                        method: 'post',
                        url: 'http://localhost:4000/login',
                        data: {
                            email, password
                        }
                    })
                        .then((data) => {
                            if (!data) {
                                console.log(chalk.red("회원가입좀.."))
                            } else {
                                console.log(chalk.blue("✅ 로그인 성공"));
                            }
                            console.log(data)

                        })
                    console.log(answers)

                })
        };



        // 회원가입 => 회원가입절차 진행 아이디, 이메일, 페스워드 입력 => db에 저장
        // 로그인 => 이메일, 패스워드 입력 => 로그인 성공 
        // 로그인을 해서 사진을 등록하려는 사람이 있을수 있고 , 본인이 등록했던 사진을 조회하려는 사람이 있을 수도있다.
        const directory = () => {
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
                        // console.log(chalk.green("디렉토리가 맞습니다"));
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
                            const msg = `> Number of file found: ${foundImages.length
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
                                    console.log(
                                        chalk.rgb(128, 128, 128)("터미널을 종료합니다.")
                                    );
                                });
                        }
                    }
                });
        }

        const page = (menu) => {
            if (menu === "회원 가입 하시겠습니까?") {
                // TODO: 회원가입에 관한 로직 필요
                // console.log(chalk.green(answers.menu) + "를 선택하셨습니다.");

                console.log(chalk.blue("✅ 회원가입 성공"));
            } else if (menu === "로그인 하시겠습니까?") {
                // TODO: 로그인에 관한 로직 필요

                login();
                //console.log(chalk.blue("✅ 로그인 성공"));
                //directory()
                // ----------------------------

            };
        }

        // const succeedSignup = (user) => {
        //   if (user === "회원 가입 하시겠습니까?") {
        //   }
        // };
        // const succeedLogin = (user) => {
        //   if (user === "로그인 하시겠습니까?") {
        //     console.log(chalk.blue("✅ 로그인 성공"));
        //   }
        // };

        // const selected = (picture) => {
        //   if (picture === "회원 가입 하시겠습니까?") {
        //     takeQuiz();
        //   } else if (picture === "로그인 하시겠습니까?") {
        //     study();
        //   }
        // };
        // else {
        //   inquirer
        //     .prompt([
        //       {
        //         type: "input",
        //         name: "inputDirPath",
        //         message: "Directory path:",
        //       },
        //     ])
        //     .then((answers) => {
        //       if (!isDirectory(answers.inputDirPath)) {
        //         console.log(chalk.red("Not directory"));
        //         console.log(chalk.rgb(128, 128, 128)("터미널을 종료합니다."));
        //       } else {
        //         // console.log(chalk.green("디렉토리가 맞습니다"));
        //         const foundImages = dirFiles(answers.inputDirPath, INPUT_FORMATS);
        //         if (foundImages.length == 0) {
        //           console.log(chalk.red("Not found image"));
        //           console.log(chalk.rgb(128, 128, 128)("터미널을 종료합니다."));
        //         } else {
        //           const foundFormats = [];
        //           const inputInfo = Object.keys(InputFormats).reduce(
        //             (counts, key) => {
        //               const fileCount = filterSuffix(
        //                 foundImages,
        //                 InputFormats[key]
        //               ).length;
        //               if (fileCount > 0) {
        //                 counts.push(`${key}: ${fileCount}`);
        //                 foundFormats.push({
        //                   name: `${key} (.${InputFormats[key]})`,
        //                   value: `${InputFormats[key]}`,
        //                 });
        //               }
        //               return counts;
        //             },
        //             []
        //           );
        //           const msg = `> Number of file found: ${
        //             foundImages.length
        //           }\n> ${inputInfo.join(" | ")}`;
        //           console.log(chalk.green(msg));
        //           inquirer
        //             .prompt([
        //               {
        //                 type: "confirm",
        //                 name: "confirm",
        //                 message: "저장하시겠습니까?",
        //               },
        //             ])
        //             .then((answers) => {
        //               if (answers.confirm)
        //                 console.log(chalk.green("저장되었습니다."));
        //               console.log(chalk.rgb(128, 128, 128)("터미널을 종료합니다."));
        //             });
        //         }
        //       }
        //     });
        // }
    })
    .parse(process.argv); // program 객체의 마지막에 붙이는 메서드. process.argv를 인수로 받아서 명령어와 옵션을 파싱한다.