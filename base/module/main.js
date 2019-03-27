// 引入hello模块:
var he=require('./hello');
var dd=require('./exportOne');
var ee=require('./exportTwo')

dd.book("书")
dd.pen("笔")
ee.book2("电脑")

he("我得")
