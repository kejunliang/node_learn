
const express = require('express')
const routes = require('./routes')
const app = express()
// 路由
routes(app)
// 监听端口，启动程序
app.listen("3000", function () {
  console.log(`listening on port 3000`)
})