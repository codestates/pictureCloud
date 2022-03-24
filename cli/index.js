#!/usr/bin/env node

const { program } = require("commander");
const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const chalk = require("chalk");
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

program.version("1.0.0", "-v, --version").name("image-cli"); // 프로그램의 버전을 설정. 첫번째 인수로 버전, 두번째 인수로 버전을 보여줄 옵션. 여러 개인 경우 쉼표
program
  .command("template <type>") // 명령어를 설정하는 메서드. cli template html가능.(<>는 필수) *은 와일드카드 명령어로, 나머지 모든 명령어
  .usage("<type> --filename [filename] --path [path]") // 명령어의 사용법을 설정. 사용법은 명령어에 도움 옵션(-h 또는 --help)을 붙였을 때 나타나는 설명서에 표시. [options]라고 되어 있는데, []는 필수가 아닌 선택이라는 뜻.
  .description("템플릿을 생성합니다.") // 명령어에 대한 설명
  .alias("tmpl") // 명령어의 별칭을 설정할 수 있다. tmpl이므로 cli template html 대신 cli tmpl html
  .option("-f, --filename [filename]", "파일명을 입력하세요.", "index") // 명령어에 대한 부가적인 옵션 설정. 첫번째 인수가 옵션 명령어, 두번째 인수가 옵션에 대한 설명. 마지막 인수는 옵션 기본값. 옵션을 입력하지 않았을 경우 자동으로 기본값이 적용. 옵션 이름으로 name은 위의 name 메서드와 충돌할 위험이 있으니 사용하지 말자
  .option("-d, --directory [path]", "생성 경로를 입력하세요", ",")
  .action((type, options) => {
    // 명령어에 대한 실제 동작을 정의하는 메서드. <type> 같은 필수 요소나 옵션들을 매개변수로 가져올 수 있다.
    makeTemplate(type, options.filename, options.directory);
  });

// 첫번째 매개변수인 cmd에는 명령어에 대한 전체적인 내용이 들어있고 두번째 매개변수인 args에는 cli 명령어 다음에 오는 인수가 들어 있다.
// 만약 명령어가 cli copy면 args에는 ['copy']가 들어 있고, 명령어가 cli면 args에는 undefined가 들어 있다. 따라서 args 값의 유무로 cli를 입력했는지 입력하지 않았는지를 구별할 수 있다.
// -> args가 아니라 args.args[0]이다.

// inquirer 객체는 prompt라는 메서드를 가지고 있다. 이 메서드는 인수로 질문 목록을 받고, 프로미스를 통해 답변(answers 객체)을 반환한다.
// type: 질문의 종류. input, checkbox, list, password, confirm 등이 있다
// name : 질문의 이름. 나중에 답변 객체가 속성명으로 질문의 이름을, 속성값으로 질문의 답을 가지게 된다.
// message: 사용자에게 표시되는 문자열. 여기에 실제 질문을 적자
// choices: type이 checkbox, list 등인 경우 선택지를 넣는 곳. 배열로
// default: 답을 적지 않았을 경우 기본값

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
    }
  })
  .parse(process.argv); // program 객체의 마지막에 붙이는 메서드. process.argv를 인수로 받아서 명령어와 옵션을 파싱한다.