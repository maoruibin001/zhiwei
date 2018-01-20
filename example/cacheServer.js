/**
 * Created by lenovo on 2018/1/18.
 */
const express = require('express');
const path = require('path');
const http = require('http');
const fs = require('fs');
const file = fs.readFileSync('./hello.html');

const app = express();
app.use(express.static('../example', {
  etag: true,
  lastModified: true,
}))
app.listen(3004);