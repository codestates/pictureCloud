const inquirer = require("inquirer");
const chalk = require("chalk");
const { signout } = require("./signout.js");
const { directory } = require("./directory.js");
const { imageList } = require("./imageList.js");
const { changePassword } = require("./changePassword");

module.exports = {
  select: (accessToken, email) => {
    inquirer
      .prompt([
        {
          type: "list",
          name: "choice",
          message: "✅ 선택해주세요",
          choices: [
            chalk.green("이미지 업로드"),
            chalk.white("이미지 목록"),
            chalk.blue("로그아웃"),
            chalk.yellow("비밀번호 변경"),
            chalk.red("회원탈퇴"),
          ],
        },
      ])
      .then((data) => {
        const { choice } = data;
        if (choice === chalk.red("회원탈퇴")) {
          console.clear();
          console.log(chalk.bgRedBright("🔚 회원탈퇴를 진행합니다"));
          signout(accessToken, email);
        } else if (choice === chalk.blue("로그아웃")) {
          console.clear();
          console.log(chalk.bgGreen.black("✔️ 로그아웃 성공"));
        } else if (choice === chalk.green("이미지 업로드")) {
          console.clear();
          console.log("📤  imeage 업로드를 시작합니다.");
          directory(email);
        } else if (choice === chalk.yellow("비밀번호 변경")) {
          console.clear();
          console.log(chalk.bgMagenta.black("🔏 비밀번호 변경을 시작합니다."));
          changePassword(accessToken);
        } else if (choice === chalk.white("이미지 목록")) {
          console.clear();
          console.log("📚 imeage 목록입니다.");
          imageList(email);
        }
      });
  },
};
