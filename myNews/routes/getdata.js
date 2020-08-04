var http = require('http');
var cheerio = require("cheerio");
var iconv = require('iconv-lite')
var Username = "kejl";
var Password = "f72yrU&"
/*
功能：获取OA的LtpaToken 用户登录系统
*/
function getLtpaToken() {
  //创建promise 用户再次获取的时候传递cookie信息
  var p = new Promise((resolve, reject) => {
    // 第一次请求获取  LtpaToken
    var options = {
      hostname: 'oa.smartdot.com.cn',
      path: "/names.nsf?Login&%25%25ModDate=0000000000000000&reasonType=3&idx_isuseingV6idx=0&idx_usehegao=&rftfootercontent=&%25%25Surrogate_locale=1&locale=zh-cn&Username=kejl&Password=f72yrU%26&RedirectTo=%2Findishare%2Fsecurtrac.nsf%2Fagttrac%3Fopenagent%26url%3D%2Findishare%2Foffice.nsf%2F%28frame%29%2Findex",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'GET'
    };
    var req = http.request(options, function (res) {
      console.log(333333)
      console.log('STATUS: ' + res.statusCode);
      console.log('HEADERS: ' + JSON.stringify(res.headers));
      var chunks = []
      res.on("data", function (data) {

        chunks.push(data)
      })
      res.on("end", function () {
        var cookie = JSON.stringify(res.headers)
        resolve(cookie)
      });

    });
    req.on('error', function (e) {
      console.log('problem with request: ' + e.message);
      reject(e.message)
    });

    req.end();
  })

  return p;
}
// 根据获取的ltpatoken进行登录并获取页面信息
function main() {
  let p = new Promise(function (resolve, reject) {
    getLtpaToken().then((value) => {
      let url = "/product/mobile/xmzd.nsf/vwalldocformyviewsearch?searchview&searchorder=3&view=vwalldocformyviewsearch&query=%E5%BE%AE%E4%BF%A1&count=1"
      getRes(value, url).then(data => {
        
        resolve(data);
      })
    })
  })
  return p;
}


async function getRes(value, url) {
  let data = await GetInfo(value, url)
  //console.log(data)
        // console.log("数据1"+  data)
        var $ = cheerio.load(data, { decodeEntities: false });
        //获取数据table  这里类似 jquery
        // console.log("解析=="+$("textarea").text())
        $ = cheerio.load($("textarea").text(), { decodeEntities: false });
        console.log( $("tr").length)
        console.log( $("tr")[1].children[1].children[0].attribs.href)
        let urlbyunid=$("tr")[1].children[1].children[0].attribs.href
        let data1= await  await GetInfo(value, urlbyunid)
        console.log(data1)
  return data+data1

}
// 进行登录并返回信息
async function GetInfo(cookie, url) {
  console.log("jinlaile===" + cookie);
  var obj = JSON.parse(cookie)
  LtpaToken = obj["set-cookie"][0].split(";")[0]
  /// 第二次请求 登录
  var cookie = "myusername=" + Username + "; SessionID=21C724E0CA4022AA707FD502CCFDCAC9FFC8344C; indi_locale=zh-cn;" + LtpaToken
  var p = new Promise(function (resolve, reject) {
    var options1 = {
      hostname: 'dmserver.smartdot.com.cn',
      path: url,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': cookie
      },
      method: 'GET'
    };
    var reqAgain = http.request(options1, function (res1) {
      console.log('STATUS: ' + res1.statusCode);
      console.log('HEADERS: ' + JSON.stringify(res1.headers));
      var chunks = []
      res1.on("data", function (data) {
        chunks.push(data)
      })
      res1.on("end", function () {
        // console.log(chunks)
        // 将二进制数据解码成 gb2312 编码数据
        var html = iconv.decode(Buffer.concat(chunks), 'gb2312');
        // console.log(html)
        resolve(html)
      });
    });
    reqAgain.on('error', function (e) {
      console.log('problem with request: ' + e.message);
    });
    reqAgain.end();
  })
  return p;
}
console.log("-----------------------------------------")
module.exports = main()
