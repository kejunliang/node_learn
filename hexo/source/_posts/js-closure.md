---
title: js-closure
date: 2019-03-12 09:25:54
tags:
     - js 
categories:
     - js 
---

# 今天来聊聊闭包
   闭包：就是能读取其他函数内部变量的函数。由于在Javascript语言中，只有函数内部的子函数才能读取局部变量，因此可以把闭包简单理解成"定义在一个函数内部的函数"。

   ``` javascript
   // 此样例来此 阮一峰的个人日志
function fn1(){
var n=1;
    add=function(){n=n+1}
    function fn2(){
        alert(n)
    }
    return fn2;
}
var fn=fn1()
//可以实现一个计数器
var b=function(){ 
var n=0; 
var test=function (){ 
    n=n+1
    console.log(n)
};
return test
}
var main=b()
main(); //1
main(); //2
main(); //3
   ```

