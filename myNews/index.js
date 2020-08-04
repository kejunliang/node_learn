const Koa = require('koa')
const views = require('koa-views')
const path = require('path')
const app = new Koa()
const static = require('koa-static');
const routes = require("./routes/index")
const querystring = require("querystring");

// 加载模板引擎
app.use(views(path.join(__dirname, './view'), {
  extension: 'ejs'
}))
// 设置静态文件目录
app.use(static(__dirname + '/public'))
console.log(__dirname + '/public')

app.use(routes)
app.listen(3000, function () {
  console.log("listening on port 3000")
})
