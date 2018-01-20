/**
 * Created by lenovo on 2018/1/2.
 */
const http = require('http');
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
app.set('views',path.resolve(__dirname , './view') );
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');
// app.use()
app.use(['/name', '/age', '/agee'], (req, res) => {
  res.render('hello', {path2: req.originalUrl});
  // res.sendFile()
});

app.get('/', (req, res) => {
  console.log(req.url)
  res.send('hello world')
})
//
// app.post('/hello', (req, res) => {
//   res.send('hello world')
// });

app.listen(3001)
// http.createServer((req, res) => {
//   res.writeHead(200, {'Content-Type': 'text/application'});
//   res.end('hell world');
// }).listen(8088);
