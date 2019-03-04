
// 通过events.EventEmitter 来获取返回的信息

var http = require('http');  
var events = require("events");
var cheerio=require("cheerio");
var iconv= require('iconv-lite')
var emitter = new events.EventEmitter()
 // 第一次请求获取  LtpaToken
var options = {  
    hostname: 'uatbx.scpcdc.com.cn',  
    path: "/names.nsf?Login&%25%25ModDate=0000000000000000&reasonType=0&%25%25Surrogate_locale=1&locale=zh-cn&Username=chencheng02&Password=kfpassword&RedirectTo=%2Findishare%2Fsecurtrac.nsf%2Fagttrac%3Fopenagent%26url%3D%2Findishare%2Fbxgl%2Fywjcsj.nsf%2F%28frame%29%2Fdzbx", 
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    }, 
    method: 'GET'  
};  
  
var req = http.request(options, function (res) {  
    console.log('STATUS: ' + res.statusCode);  
    console.log('HEADERS: ' + JSON.stringify(res.headers));  
    res.on("data",function(data){
      chunks.push(data)
    })
    res.on("end",function(){
      var cookie=JSON.stringify(res.headers)
      //添加事件监听
      emitter.emit("setCookeie", cookie) 
    }); 
 
}); 
req.on('error', function (e) {  
  console.log('problem with request: ' + e.message);  
});  
req.end(); 

 // //添加事件监听
emitter.on("setCookeie", getInfo)            //监听setCookeie事件


function getInfo(cookie){
    console.log("jinlaile==="+cookie);
    var obj=JSON.parse(cookie)
    LtpaToken=obj["set-cookie"][0].split(";")[0]
    /// 第二次请求 登录
    var latpCode=""
    var cookie="myusername=admin; SessionID=21C724E0CA4022AA707FD502CCFDCAC9FFC8344C; indi_locale=zh-cn;"+LtpaToken
    var options1 = {  
        hostname: 'uatbx.scpcdc.com.cn',  
        path: "/ghbx/dep1/xypj.nsf/frmTongJi?OpenForm&name=", 
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Cookie': cookie
        }, 
        method: 'GET'  
    };  
      
    var reqAgain = http.request(options1, function (res1) {  
        console.log('STATUS: ' + res1.statusCode);  
        console.log('HEADERS: ' + JSON.stringify(res1.headers));  
        var chunks=[]
        res1.on("data",function(data){
                chunks.push(data)
        })
        res1.on("end",function(){
            // console.log(chunks)
            // 将二进制数据解码成 gb2312 编码数据
            var html = iconv.decode(Buffer.concat(chunks), 'gb2312');
            
            console.log(html)
            var $ = cheerio.load(html,{decodeEntities: false});
            //获取数据table
        });  
    });    
    reqAgain.on('error', function (e) {  
        console.log('problem with request: ' + e.message);  
    });  
    reqAgain.end();

}
