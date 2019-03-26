var fs = require('fs');

var data = 'Hello, Node.js 我来异步写数据了';
fs.writeFileSync('outputSync.txt', data);