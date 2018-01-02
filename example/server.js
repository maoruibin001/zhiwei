/**
 * Created by lenovo on 2018/1/2.
 */
const http = require('http');

http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/application'});
  res.end('hell world');
}).listen(8088);
