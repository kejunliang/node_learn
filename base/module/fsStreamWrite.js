var fs = require('fs');

var ws1 = fs.createWriteStream('outputStream1.txt', 'utf-8');
ws1.write('使用Stream写入文本数据...\n');
ws1.write('END.');
ws1.end();

var ws2 = fs.createWriteStream('outputStream2.txt');
ws2.write(Buffer.from(new String("测试111111"), 'utf8'));
ws2.write(Buffer.from(new String("end"), 'utf8'));
ws2.end();