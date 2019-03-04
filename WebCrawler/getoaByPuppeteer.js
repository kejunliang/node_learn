const puppeteer = require('puppeteer');
 (async () => {
  const browser = await puppeteer.launch();//打开浏览器
  const page = await browser.newPage();//打开一个空白页
  await page.goto('http://uatbx.scpcdc.com.cn/');//在地址栏输入网址并等待加载
  //await page.screenshot({path: 'example.png'});//截个图
  //登录
  await page.type('#un',"admin");
  await page.type('#pwd','kfpassword');
  await page.click("div[class='login-btn']");
 //页面登录成功后，是否需要reload 根据实际情况来确定
  
 await page.goto('http://uatbx.scpcdc.com.cn/ghbx/office.nsf/(frame)/normal');//在地址栏输入网址并等待加载
 await page.waitFor(5000);
 await page.screenshot({path: 'example2.png'});//截个图
 await browser.close();//关掉浏览器
})();