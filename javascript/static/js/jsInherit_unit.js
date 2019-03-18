//组合式继承

//声明父类
function superclass(id){
   this.books=["book1","book2"];
   this.id=id;

}
//父类声明原型方法
superclass.prototype.showbooks=function(){
    console.log(this.books)
}

//声明子类
function subclass (id){
   superclass.call(this,id)
}

//类式继承
subclass.prototype=new superclass();

//创建第一个子类实例

var instance1=new subclass(10);
var instance2=new subclass(11);
instance1.books.push("ceshi");
console.log(instance1.books)
console.log(instance2.books)
instance1.showbooks();
instance2.showbooks();
//“小白，注意这里。SuperClass.call(this, id)；这条语句是构造函数式继承的精华，由于call这个方法可以更改函数的作用环境，因此在子类中，对superClass调用这个方法就是将子类中的变量在父类中执行一遍，由于父类中是给this绑定属性的，因此子类自然也就继承了父类的共有属性。由于这种类型的继承没有涉及原型 prototype，所以父类的原型方法自然不会被子类继承，而如果要想被子类继承就必须要放在构造函数中，这样创建出来的每个实例都会单独拥有一份而不能共用，这样就违背了代码复用的原则。为了综合这两种模式的优点，后来有了组合式继承。”
//组合继承