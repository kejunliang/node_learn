var fs = require('fs');

var data = fs.readFileSync('sample.txt', 'utf-8');
console.log(data);