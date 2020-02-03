const Koa = require('koa')
const views = require('koa-views')
const path = require('path')
const app = new Koa()
const static = require('koa-static');
const Router = require('koa-router');
const querystring = require("querystring");
const home = new Router()
// 加载模板引擎
app.use(views(path.join(__dirname, './view'), {
  extension: 'ejs'
}))
// 设置静态文件目录
app.use(static(__dirname + '/public'))
console.log(__dirname + '/public')
home.get('/', async (ctx, next) => {
  title = 'Easy Search'
  await ctx.render('index', {
    title,
  })
  await next()
})
home.get('/list', async (ctx, next) => {
 
  var query=ctx.querystring
  var key=query.split("=")[0]
  console.log(decodeURIComponent(key))
  title = 'List'
  await ctx.render('list', {
    title,
  })
  await next()
})
app.use(home.routes())
app.listen(3000, function () {
  console.log("listening on port 3000")
})
