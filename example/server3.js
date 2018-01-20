/**
 * Created by lenovo on 2018/1/19.
 */
/**
 * Created by lenovo on 2018/1/18.
 */
const express = require('express');
const path = require('path');
const http = require('http');
const fs = require('fs');
const file = fs.readFileSync('./hello.js');


http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type':'text/javascript', 'Etag': 'W/"22332"'});
  // res.write('hello world');
  // res.end('222');
  // const readable = fs.createReadStream('./hello.html');
  res.end(file);
}).listen(3005);