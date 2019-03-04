var http = require('http');  
var cheerio=require("cheerio");
var iconv= require('iconv-lite')
var Username="admin";
var Password="kfpassword"
/*
功能：获取OA的LtpaToken 用户登录系统
*/
function getLtpaToken(){
    //创建promise 用户再次获取的时候传递cookie信息
    var p=new Promise((resolve,reject)=>{
        // 第一次请求获取  LtpaToken
        
        var options = {  
            hostname: 'uatbx.scpcdc.com.cn',  
            path: "/names.nsf?Login&%25%25ModDate=0000000000000000&reasonType=0&%25%25Surrogate_locale=1&locale=zh-cn&Username="+Username+"&Password="+Password+"&RedirectTo=%2Findishare%2Fsecurtrac.nsf%2Fagttrac%3Fopenagent%26url%3D%2Findishare%2Fbxgl%2Fywjcsj.nsf%2F%28frame%29%2Fdzbx", 
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
              resolve(cookie)
            }); 
        
        }); 
        req.on('error', function (e) {  
          console.log('problem with request: ' + e.message);  
          reject( e.message)
        });  

        req.end(); 
    })

    return p;
}
// 根据获取的ltpatoken进行登录并获取页面信息
getLtpaToken().then((value)=>{
    console.log(value)
    GetInfo(value)
})
// 进行登录并返回信息
function GetInfo(cookie){
    console.log("jinlaile==="+cookie);
    var obj=JSON.parse(cookie)
    LtpaToken=obj["set-cookie"][0].split(";")[0]
    /// 第二次请求 登录
    var cookie="myusername="+Username+"; SessionID=21C724E0CA4022AA707FD502CCFDCAC9FFC8344C; indi_locale=zh-cn;"+LtpaToken
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
            console.log(1111)
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
