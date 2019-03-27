var fs = require('fs');

var data = 'Hello, Node.js 我来异步写数据了111111111';
fs.writeFileSync('outputSync.txt', data);