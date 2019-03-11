---
title: js_obj
date: 2019-03-11 19:40:41
tags: 
     - js 
categories:
     - js 
---
#  今天来聊聊JavaScript的 函数的多种形式
   我们在项目中经常会写function, 基本就是一个需求或者一个功能我们就写一个function，这样会有很多过程，其实JavaScript也是面向对象的，我们可以尝试用对象的方式来写函数，你会发现不一样的天地。
   比如我们在处理一个请假申请过程中，里面会有很多js方法，比如验证、数据格式化、异步获取等方法，我们通常的方式是n个function累加，这样有一个不好的地方就是我们会创建很多全局变量，其实我们完全可以有多种形式来处理我们的各种业务函数。
## 1.用对象来收编函数
``` javascript
    var obj={fn:function(){
         }
    }
```
## 2.对象的另外一种形式
 ``` javascript 
    var obj=function(){};
    obj.fn=fucntion(){

    };
 ```
## 3.对象的又一种方式
 ``` javascript 
    var obj=function(){
        return {
            fn:function(){}
            }
        }
 ```
##  4.类的形式
 ``` javascript 
    var obj=function(){
        this.fn=function(){}
    }
 ```
## 5.原型的形式
 ``` javascript 
     //形式1
    var obj=function(){};
    obj.prototype.fn=function(){};
    //形式2
    var obj1=function(){}
    obj1.prototype={fn:function(){}}
    //形式3
    Function.prototyp.addMethods=function(name,fn){
        this[name]=fn;
    }
    var fn=new Function()
    fn.addMethods("fn1",function(){})
 ```
