const router = require('express').Router();
const controller = require("../controllers/user")

router.post('/login', controller.login)
router.post('/logout', controller.logout)
router.delete('/singout', controller.singout)

module.exports = router;