
//1 用对象收编函数
var checkobject={
    checkname:function name() {
        console.log("验证名称")
    },
    checkEmail:function name() {
        console.log("验证邮箱")
    }
}
checkobject.checkname();

// 2 对象的另外一种形式
var checkobject2=function(){};
checkobject2.checkname=function(){
    console.log("验证名称2")
}
checkobject2.checkEmail=function(){
    console.log("验证邮箱2")
}
checkobject2.checkEmail();
//3  真假对象
var checkobject3=function(){
    return {
        checkname:function(){
            console.log("验证名称3")
        },
        checkEmail:function(){
            console.log("验证邮箱3")
        }
    }
}
var dd=checkobject3();
dd.checkname();

// 4 类也可以
var checkobject4=function(){
    this.checkname=function(){
        console.log("验证名称4")
    }
}
var aa=new checkobject4();
aa.checkname();

// 原型对象
var checkobject5=function(){}
checkobject5.prototype={
    checkname:function(){console.log("验证名字5")},
    checkEmail:function(){console.log("验证邮箱5")}
}
var  a5=new checkobject5()
a5.checkname();
a5.checkEmail();

// 为原始function 增加一个通用方法
Function.prototype.addMethod=function(name,fn){
    this[name]=fn;
    return this;
}
var a6=new Function();

a6.addMethod("checkname",function(){console.log("验证名字6");return this;}).addMethod("checkemail",function(){console.log("验证邮箱6");return this})
a6.checkname().checkemail();
a6.checkemail();

// 为原始function 增加一个通用方法
Function.prototype.addMethod_1=function(name,fn){
    this.prototype[name]=fn;
    return this;
}
var a7=new Function();
a7.addMethod_1("checkname",function(){console.log("验证名字7");return this;}).addMethod_1("checkemail",function(){console.log("验证邮箱7");return this})
var aa7=new a7();
aa7.checkname();