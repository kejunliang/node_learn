---
title: webcrawler
date: 2019-03-05 13:29:05
categories:
    - 网络爬虫
tags: 
    - 网络爬虫
---
#  模拟登录的实现
   **分析下我们一般的登录过程就是向服务器发送用户和密码，服务器响应后返回一个唯一编码，把这个编码存在Cookie里，这样我们后续的访问都带着这个cookie来访问，就实现了登录过程。下来我们就来实现这两个步骤**
#  获取cookies 
   1. 首先我们用浏览器分析下登录过程。
        1). 打开网站（这里是最简单模式，没有验证码）的登录页面，打开调试器，按照下图操作进行登录。
        ![](data1.png)
        2). 打开第一个截图的login的资源请求如下图，主要是为了找到formdata数据。
        ![](data2.png)
        3). 查找formData的数据，在这里之前json对象传输请求的时候一直遇到了一些问题，后来就改成用url参数的方式来请求，请看下图。
        ![](data3.png)
   2. 到这里我们就可以开始撸代码了。
        1). 用node的http 模拟请求。这里注意我们要将请求的方法返回一个promise对象，这样为了将请求成功后的值传递给下一个操作。至于原因就不说了。
        ```
        function getLtpaToken(){
    //创建promise 用户再次获取的时候传递cookie信息
    var p=new Promise((resolve,reject)=>{
        // 第一次请求获取  LtpaToken
        
        var options = {  
            hostname: 'uatbx.xxx.com.cn',   //这里是样例，请注意实际的域名信息
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
        ```
        2). 我们根据返回过来的LtpaToken在次请求另外一个路径。我们将这个值存在headers的cookies里
        ```  
        // 进行登录并返回信息
function GetInfo(cookie){
    console.log("jinlaile==="+cookie);
    var obj=JSON.parse(cookie)
    LtpaToken=obj["set-cookie"][0].split(";")[0]
    /// 第二次请求 登录
    var cookie="myusername="+Username+"; SessionID=21C724E0CA4022AA707FD502CCFDCAC9FFC8344C; indi_locale=zh-cn;"+LtpaToken
    var options1 = {  
        hostname: 'uatbx.xxx.com.cn',  
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

        ```
        3). 就是最后调用的主方法了。最终第二次请求的时候其实就能登录并返回页面html代码。
        ```
        // 根据获取的ltpatoken进行登录并获取页面信息
        getLtpaToken().then((value)=>{
        console.log(value)
        GetInfo(value)
        })
        ```
3. 后续工作， 优化代码。。。   
