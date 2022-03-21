const { sign, verify } = require("jsonwebtoken")
require("dotenv").config()

module.exports = {
    generateAccessToken: (data) => {
        return sign(data, process.env.ACCESS_SECRET, { expiresIn: "1d" })
    },

    //  //리프래쉬토큰생성
    //  generateRefreshToken: (data) => {
    //     return jwt.sign(data, process.env.REFRESH_SECRET, {expiresIn: '30d'})
    // },

    sendAccessToken: (res, accessToken) => {
        res.cookie("jwt", accessToken, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
        })
    },
    //토큰검증하기
    isAuthorized: (req) => {
        const authorization = req.headers.authorization
        if (!authorization) {
            return res.status(401).send({ message: "invalid token" })
        }
        const token = authorization.split(' ')[1]
        try {
            return verify(token, process.env.ACCESS_SECRET)
        } catch (err) {
            return null;
        }
    },



}