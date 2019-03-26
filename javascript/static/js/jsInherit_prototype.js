//原型继承
function inheritobject(o){
   //定义一个过度函数
   function f(){}
   f.prototype=o;
   return new f();
}

var book={
    name:"js book",
    alikebook:["css book","html book"]
}

var newbook=inheritobject(book);
newbook.name="ceshi"
console.log(newbook.name);
var newbook1=inheritobject(book);
console.log(newbook1.name);

var dd=new inheritobject(book);
console.log(dd)