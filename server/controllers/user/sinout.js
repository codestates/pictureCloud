const { user } = require("../../models/user")
const { isAuthorized } = require("../tokenFunctions/index")

module.exports = async (req, res) => {
    try {
        const accessToken = isAuthorized(req);
        if (!accessToken) {
            res.status(401).json({
                "message": "Invaild token"
            })
        } else {
            await user.destory({
                where: {
                    email: email,
                    username: username,
                    password: password,
                }
            })
            res.status(200).json({
                "message": "ok"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Interner Server Error"
        })
    }
}

