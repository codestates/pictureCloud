const inquirer = require("inquirer");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const request = require("request");
const chalk = require("chalk");
const cliProgress = require("cli-progress");
const colors = require("ansi-colors");

module.exports = {
  imageDownload: (email) => {
    axios
      .post(
        "http://ec2-52-78-182-60.ap-northeast-2.compute.amazonaws.com/imageurl",
        {
          email: email,
        }
      )
      .then((data) => {
        const userImages = data.data;
        const userInputDirPath = path.resolve("./");

        if (userImages.length == 0) {
          console.log(chalk.red("Not found image"));
          console.log(chalk.rgb(128, 128, 128)("터미널을 종료합니다."));
        } else {
          console.log(`Directory path: ${userInputDirPath}/mypicloud`);
          console.log(`image: ${userImages.length}`);

          inquirer
            .prompt([
              {
                type: "confirm",
                name: "confirm",
                message: "다운로드 하시겠습니까?",
              },
            ])
            .then((answers) => {
              if (answers.confirm) {
                const makeFolder = (dir) => {
                  if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir);
                  }
                };

                makeFolder(`${userInputDirPath}/mypicloud`);

                for (let i = 0; i < userImages.length; i++) {
                  const stream = request(userImages[i]);

                  let a = userImages[i].split("/");
                  let b = a[4].split("_");
                  let imageName = b[1];

                  const writeStream = fs.createWriteStream(
                    `${userInputDirPath}/mypicloud/${imageName}`
                  );
                  stream.pipe(writeStream);
                }

                const progressBar = userImages.length;

                paintime(function () {
                  console.log(chalk.green("다운로드 하였습니다."));
                  console.log(chalk.rgb(128, 128, 128)("터미널을 종료합니다."));
                });
                function paintime(onComplete) {
                  const b1 = new cliProgress.SingleBar({
                    format:
                      "CLI Progress |" +
                      colors.cyan("{bar}") +
                      "| {percentage}% || {value}/{total}",
                    barCompleteChar: "\u2588",
                    barIncompleteChar: "\u2591",
                    hideCursor: true,
                  });
                  b1.start(progressBar, 0);
                  let value = 0;
                  const timer = setInterval(function () {
                    value++;
                    b1.update(value);
                    if (value >= b1.getTotal()) {
                      clearInterval(timer);
                      b1.stop();
                      onComplete.apply(this);
                    }
                  }, 7);
                }
              }
            });
        }
      });
  },
};
