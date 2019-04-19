
var xlsx = require('node-xlsx');
// Or var xlsx = require('node-xlsx').default;
var fs = require('fs');
//console.log("F:\01项目文档\凤凰传媒\江苏凤凰传媒协同平台财务模块改造项目低值易耗品开发计划V1.1.xlsx")
// Parse a buffer
//const workSheetsFromBuffer = xlsx.parse(fs.readFileSync(`${__dirname}/myFile.xlsx`));
// Parse a file
var  workSheetsFromFile = xlsx.parse(`${__dirname}/test.xlsx`);
console.log(workSheetsFromFile[0].data)
fs.writeFileSync('myLog.txt', JSON.stringify(workSheetsFromFile[0].data));

var date = new Date(1900, 0, 43573)
console.log(date.getFullYear())