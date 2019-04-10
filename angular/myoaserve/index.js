
const express = require('express')
const routes = require('./routes')
const app = express()
const bodyParser = require('body-parser');
const expressJwt = require('express-jwt');


app.all('*', function(req, res, next) { 
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
  else  next();
});

app.use(bodyParser.json());
//app.use(expressJwt({secret: 'app-super-shared-secret'}).unless({path: ['/api/signin/auth']}));
// 路由
routes(app)
// 监听端口，启动程序
app.listen("3000", function () {
  console.log(`listening on port 3000`)
})