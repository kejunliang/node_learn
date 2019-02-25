const Koa = require('koa');
const path = require('path')
const controller = require('./controller');
const templating = require('./templating');
const app = new Koa();
const isProduction = process.env.NODE_ENV === 'production';
//使用模板
app.use(templating('views', {
    noCache: !isProduction,
    watch: !isProduction
}));
//注册路由
app.use(controller());
app.listen(3000);