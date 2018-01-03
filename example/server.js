/**
 * Created by lenovo on 2018/1/2.
 */
const http = require('http');
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  new Error(22)
  // res.send('hello')
}, () => {
  console.log(33333)
});

app.listen(3000)
// http.createServer((req, res) => {
//   res.writeHead(200, {'Content-Type': 'text/application'});
//   res.end('hell world');
// }).listen(8088);
