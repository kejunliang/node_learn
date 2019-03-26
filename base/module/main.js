// 引入hello模块:
var greet = require('./hello');
var run = require ('./exportOne')
var run2 = require ('./exportTwo')
var s = 'Michael';
run.book("书");
run.pen("铅笔")
run2.book2("java编程思想")
run2.pen2("鼠标")
