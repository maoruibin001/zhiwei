/**
 * Created by lenovo on 2017/11/9.
 * 开发环境热加载服务器
 */
const devConfig = require('./webpack.dev.config');
const webpack = require('webpack');
const baseConfig = require('./baseConfig');
const serialize = require('serialize-javascript');
// 热加载插件
const hotMiddleware = require('webpack-hot-middleware');
// 热更新插件
const devMiddleware = require('webpack-dev-middleware');
const express = require('express');
const path = require('path');

const bodyParser = require('body-parser');

const api = require('../www/api/login/login');


// 编译配置文件
const compiler = webpack(devConfig);

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
// app.use(express.static('./dist'));
// 热加载中间件
const webpackHot = hotMiddleware(compiler, {});
// 本地开发中间件
const webpackDev = devMiddleware(compiler, {
  noInfo: true
});

app.use(webpackHot);

app.use(webpackDev);

app.get('/favicon.ico', function (req, res) {
  res.end();
});
// 页面路由
app.get('/:pagename?', function (req, res, next) {
  let pagename = req.params.pagename || baseConfig.INDEXMODULE;
  let filepath = path.resolve(__dirname, '../dist', pagename, 'index.html');
  // 使用webpack提供的outputFileSystem
  compiler.outputFileSystem.readFile(filepath, function (err, result) {
    if (err) {
      // something error
      console.log(err);
      return next('输入路径无效，请输入目录名作为路径，有效路径有：\n/' + Object.keys(devConfig.entry).filter(e => e !== 'vendors').join('\n/'))
    }
    // 发送获取到的页面
    res.set('content-type', 'text/html')
    res.send(result)
    res.end()
  })
});

app.use('/los', api);
app.listen(8089, function () {
  console.log('server start at:  localhost:8089');
});


