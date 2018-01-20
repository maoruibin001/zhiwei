/**
 * Created by lenovo on 2017/11/9.
 * 开发环境热加载服务器
 */
// 定时任务
const task = require('./task');
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

const API = require('../www/api');

const cookieParser = require('cookie-parser');

const session = require('express-session');
const RedisStore = require('connect-redis')(session);

const Utils = require('../www/utils/utils');
task();

function sessionConfig(app, keyword) {
  keyword = keyword || 'sessiontest';
  app.use(cookieParser(keyword));
  app.use(session({
    store: new RedisStore({
      host: "127.0.0.1",
      port: 6379,
      db: "0"
    }),
    resave:false,
    saveUninitialized:true,
    secret: keyword,
    cookie: {maxAge: 100000}
  }))
}

// 编译配置文件
const compiler = webpack(devConfig);

const app = express();

// app.use(cookieParser('sessiontest'));
// app.use(session({
//   secret: 'sessiontest',//与cookieParser中的一致
//   resave: true,
//   saveUninitialized:true
// }));

sessionConfig(app);//默认对session进行配置

app.use('/:pagename/', require('connect-history-api-fallback')({
  index: '/'
})); //后端单页路由配置

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.resolve(__dirname, '../static/')));
// 热加载中间件
const webpackHot = hotMiddleware(compiler, {});
// 本地开发中间件
const webpackDev = devMiddleware(compiler, {
  noInfo: true
});


app.use(webpackHot);

app.use(webpackDev);

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

API(app, '/los');
// app.use('/los', api);
app.listen(8089, function () {
  console.log('server start at:  localhost:8089');
});


