const express = require('express')
const router = express.Router()
const checkLogin = require('../middlewares/check').checkLogin

// GET /posts 所有用户或者特定用户的文章页
//   eg: GET /posts?author=xxx
let dataSet = [
  {"id":"0","name":"张三","age":20},
  {"id":"1","name":"李四","age":34},
  {"id":"2","name":"王五","age":30},
  {"id":"3","name":"马六","age":50}
];
router.get('/', function (req, res, next) {
  console.log("调用了")
  res.json(dataSet);
})

// POST /posts/create 发表一篇文章
router.post('/create', checkLogin, function (req, res, next) {
  res.send('发表')
})

// GET /posts/create 发表文章页
router.get('/create', checkLogin, function (req, res, next) {
  res.send('发表页面')
})

// GET /posts/:postId 单独一篇的文章页
router.get('/:postId', function (req, res, next) {
  res.send('发表文章页')
})

// GET /posts/:postId/edit 更新文章页
router.get('/:postId/edit', checkLogin, function (req, res, next) {
  res.send('编辑发表文章页')
})

// POST /posts/:postId/edit 更新一篇文章
router.post('/:postId/edit', checkLogin, function (req, res, next) {
  res.send('编辑发表文章页')
})

// GET /posts/:postId/remove 删除一篇文章
router.get('/:postId/remove', checkLogin, function (req, res, next) {
  res.send('删除')
})

module.exports = router