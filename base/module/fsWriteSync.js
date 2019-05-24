var fs = require('fs');

var data = 'Hello, Node.js 我来异步写数据了111111111';
fs.writeFileSync('outputSync.txt', data);




for(i=0;i<25;i++){
    fs.writeFileSync('F:\\bigatt\\text'+i+'.txt',data+"="+i)
    
}
