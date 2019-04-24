module.exports = function (app) {
    app.get('/api/', function (req, res) {
      console.log("调用服务器了api000")
      res.send("登录页")  
    })
    app.use('/api/signup', require('./signup'))
    app.use('/api/signin', require('./signin'))
    app.use('/api/signout', require('./signout'))
    app.use('/api/posts', require('./posts'))
    app.use('/api/comments', require('./comments'))
  }