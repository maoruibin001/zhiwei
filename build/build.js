/**
 * Created by lenovo on 2017/11/9.
 * 生产环境打包
 */
const prodConfig = require('./webpack.prod.config');
const webpack = require('webpack');
// 删除文件插件
const rm = require('rimraf');
const path = require('path');

let dir = path.resolve(__dirname, '../dist');
// 删除原有的dist文件夹
rm.sync(dir);
// 打包
webpack(prodConfig, function (err, stats) {
  if (err) throw err;
  process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n');
});