var superClass=function(){
    this.superValue="我是父亲";
}
superClass.prototype.getSuperValue=function(){
     return this.superValue;
}
//来定义一个子类
var subClass=function(){
    this.subValue="我是儿子"
}
//继承父类
subClass.prototype=new superClass();
subClass.prototype.getSubValue=function(){
    return this.subValue;
}
//测试 
var inherit=new subClass()
console.log(inherit.getSuperValue());
console.log(inherit.getSubValue());
console.log(inherit instanceof superClass)   //true     
console.log(inherit instanceof subClass)      //true     
console.log(subClass instanceof superClass)    //false 
//前面说了，instanceof是判断前面的对象是否是后面类（对象）的实例，它并不表示两者的继承，这一点你不要弄混，其次我们看看前面的代码，你看我们在实现
// 利用 instanceof 来做安全检查
var book=function(name,id){
    if(this instanceof book){
        this.name=name;
        this.id=id;
    }else{
        return new book(name,id)
    }
    
}
var test=new book("我是图书","000")
console.log(test.name)
///构造函数继承

