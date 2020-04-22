const Router = require('koa-router');
const home = new Router()

home.get('/', async (ctx, next) => {
    title = 'Easy Search'
    await ctx.render('index', {
      title,
    })
    await next()
  })
  
  home.get('/list', async (ctx, next) => {
    var query=ctx.querystring
    var key=query.split("=")[1]
    console.log(decodeURIComponent(key))
    const data = require("./getdata")
    let res = await data;
    title = {
      "title":"结果",
      "data":res
  }
    await ctx.render('list', {
      title,
    })
    await next()
  })
  module.exports=home.routes()