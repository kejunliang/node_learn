
const express = require('express')
const router = express.Router()

const jwt = require('jsonwebtoken');


var USERS = [
  { 'id': 1, 'username': 'kejl' },
  { 'id': 2, 'username': 'test' },
  { 'id': 3, 'username': 'admin' },
];


router.post('/auth', function(req, res) {
  const body = req.body;

  console.log("登录验证接口");
  const user = USERS.find(user =>  user.userName == body.username);
  console.log(user)
  if(!user || body.password != 'todo') return res.sendStatus(401);
  var token = jwt.sign({userID: user.id,userName:user.username}, 'app-super-shared-secret', {expiresIn: '2h'});
  res.send({"msg":"ok","user":{"token":12345678,"name":user.userName}});

});

// GET /signin 登录页
router.get('/', function (req, res, next) {
  res.send("登录页")
})

// POST /signin 用户登录
router.post('/', function (req, res, next) {
  res.send("登录操作")
})

module.exports = router