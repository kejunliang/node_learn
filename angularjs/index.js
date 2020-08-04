var app = angular.module('myApp', []);
app.controller('myCtrl', ['$scope','$timeout','myService','myServiceFac',function($scope,$timeout,myService,myServiceFac) {
    $scope.firstName= "John";
    $scope.lastName= "Doe";
    $scope.handleAction=function(){
        alert("点击我了")
    }
    $scope.myHeader = "Hello World!";
    $timeout(function () {
        $scope.myHeader = "How are you today?";
    }, 2000);
    $scope.myservice=myService.myFunc("我的信息")
    $scope.myserviceFac=myServiceFac.test("我的测试")
}])
app.directive("smartdotDirective", function() {
    return {
        restrict : "ACEM",
        template : "<h1>自定义指令!</h1>"
    };
})
app.filter('reverse', function() { //可以注入依赖
    return function(text) {
        return text.split("").reverse().join("");
    }
})
app.service('myService', function() {
    this.myFunc = function (x) {
        return x+"我的自定义服务";
    }
})
app.factory('myServiceFac',function(){
    return {
        test:function(x){
            return x+"我的factory"
        }
    }
})

angular.module('routingDemoApp',['ui.router'])
//对服务进行参数初始化，这里配stateProvider服务的视图控制
.config(["$stateProvider",  function ($stateProvider) {    	
    $stateProvider		
    .state("home", {
        url: '/',   
        template:'<div>模板内容......</div>'
    })    
    .state("computers", {
        url: '/computers',   
        template:'<div>电脑......</div>'
    })    
    .state("printers", {
        url: '/printers',   
        template:'<div>打印机......</div>'
    })    
    .state("blabla", {
        url: '/blabla',   
        template:'<div>其他.....</div>'
    }) 
       
}]);  
