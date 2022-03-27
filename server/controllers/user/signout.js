const { user } = require("../../models");
const { isAuthorized } = require("../tokenFunctions/index");

module.exports = (req, res) => {
  try {
    const accessToken = isAuthorized(req);
    if (!accessToken) {
      res.status(401).json({
        message: "Invaild token",
      });
    } else {
      user.destroy({
        where: {
          email: email,
          password: password,
        },
      });
      res.status(200).json({
        message: "ok",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Interner Server Error",
    });
  }
};

// const { verify } = require("jsonwebtoken");
// const { checkAccessToken } = require("../tokenFunctions/index");
// const { user } = require("../../models"); //models 경로 연결
// const password = require("./password");

//클라이언트가 요청을보냄 (?)// 그럼 서버가 받음
//서버에서 받아서 일단 사용자 정보가 필요한 모든 페이지에서(ex mypage or login)
//토큰으로 검증하고 검증이 되면 추가작업을 진행한다.

//회원탈퇴 로직 구현
//1.탈퇴에 필요한 유저의 정보를 받아올것 (id)
//2.destory 를 이용해 유저 정보를 삭제하여 회원탈퇴를 할것.
//3.회원탈퇴가 잘 되는지 확인 해봐야 할듯.
// module.exports = async (req, res) => {
//   //  delete: async(req, res) => {
//   try {
//     const accessToken = await checkAccessToken(req);
//     if (!accessToken) {
//       res.status(401).json({
//         message: "Invalid accessToken",
//       });
//     } else {
//       await user.destroy({
//         where: {
//           email: email,
//           password: password,
//           // username: username,
//         },
//       });
//       res.status(200).json({
//         message: "회원탈퇴가 완료되었습니다",
//       });
//     }
//   } catch (err) {
//     res.status(500).json({
//       message: "회원탈퇴에 실패하였습니다",
//     });
//   }
// };
//}
