const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const chalk = require("chalk");
const axios = require("axios");
const FormData = require("form-data");
const cliProgress = require("cli-progress");
const colors = require("ansi-colors");

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
  PNG: "png",
  SVG: "svg",
  WEBP: "webp",
  BITMAP: "bmp",
};

const INPUT_FORMATS = Object.keys(InputFormats).map((key) => InputFormats[key]);

module.exports = {
  directory: (email) => {
    const userInputDirPath = path.resolve("./");
    if (!isDirectory(userInputDirPath)) {
      console.log(chalk.red("Not directory"));
      console.log(chalk.rgb(128, 128, 128)("터미널을 종료합니다."));
    } else {
      const foundImages = dirFiles(userInputDirPath, INPUT_FORMATS);
      if (foundImages.length == 0) {
        console.log(chalk.red("Not found image"));
        console.log(chalk.rgb(128, 128, 128)("터미널을 종료합니다."));
      } else {
        const foundFormats = [];
        const inputInfo = Object.keys(InputFormats).reduce((counts, key) => {
          const fileCount = filterSuffix(foundImages, InputFormats[key]).length;
          if (fileCount > 0) {
            counts.push(`${key}: ${fileCount}`);
            foundFormats.push({
              name: `${key} (.${InputFormats[key]})`,
              value: `${InputFormats[key]}`,
            });
          }
          return counts;
        }, []);
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
            if (answers.confirm) {
              const goSaveImageS3 = (inFoundImages) => {
                for (let i = 0; i < inFoundImages.length; i++) {
                  const formData = new FormData();
                  formData.append("email", email);
                  formData.append(
                    "userImg",
                    fs.createReadStream(
                      userInputDirPath + "/" + inFoundImages[i]
                    )
                  );
                  axios.post("http://localhost:4000/upload", formData, {
                    headers: formData.getHeaders(),
                  });
                }
              };

              async function delay(delayInms) {
                return new Promise((resolve) => {
                  setTimeout(() => {
                    resolve(2);
                  }, delayInms);
                });
              }

              const progressBar = foundImages.length;

              const saveImageS3 = async () => {
                const one = await axios.get(
                  "http://localhost:4000/resetrender"
                );
                const two = await axios.post("http://localhost:4000/render", {
                  email: email,
                });
                while (foundImages.length > 0) {
                  let foundImagesGet = foundImages.splice(0, 300);
                  let three = await goSaveImageS3(foundImagesGet);
                  let delayres = await delay(3000);
                }
              };

              saveImageS3();

              paintime(function () {
                console.log(chalk.green("저장되었습니다."));
                console.log(chalk.green("http://localhost:3000"));
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
                }, 5);
              }
            }
          });
      }
    }
  },
};
