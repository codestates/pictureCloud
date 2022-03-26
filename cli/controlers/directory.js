const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const chalk = require("chalk");
const axios = require("axios");
const FormData = require("form-data");

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

module.exports = {
  // 이미지 저장
  directory: () => {
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
              const saveImageS3 = () => {
                for (let i = 0; i < foundImages.length; i++) {
                  const formData = new FormData();
                  formData.append(
                    "userImg",
                    fs.createReadStream(userInputDirPath + "/" + foundImages[i])
                  );
                  axios.post("http://localhost:4000/upload", formData, {
                    // You need to use `getHeaders()` in Node.js because Axios doesn't
                    // automatically set the multipart form boundary in Node.
                    headers: formData.getHeaders(),
                  });
                }
              };

              const saveIt = async () => {
                await saveImageS3();
              };
              saveIt();
              console.log(chalk.green("저장되었습니다."));
              console.log(chalk.rgb(128, 128, 128)("터미널을 종료합니다."));
            }
          });
      }
    }
  },
};
