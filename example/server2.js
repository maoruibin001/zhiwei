/**
 * Created by lenovo on 2018/1/15.
 */
const express = require('express');

const app = express();

const fresh = require('fresh');
// app.use(function(req, res) {
//   console.log(req.accepts());
//   res.send('hello world');
// });
app.get('/', function(req, res) {
  console.log(req.referer)
  res.send("The views directory is " + req.app.get("views"));
});

app.listen(3000, function() {
  console.log('server start at: localhost:3000');
});