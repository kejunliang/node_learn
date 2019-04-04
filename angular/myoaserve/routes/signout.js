const express = require('express')
const router = express.Router()
const checkLogin = require('../middlewares/check').checkLogin

// GET /signout 登出
router.get('/', checkLogin, function (req, res, next) {
 // 清空 session 中用户信息
   res.send("退出页面")
})

module.exports = router