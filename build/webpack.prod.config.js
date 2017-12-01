/**
 * Created by lenovo on 2017/11/9.
 */
const baseConfig = require('./webpack.base.config');
const webpack = require('webpack');
// 合并插件
const merge = require('webpack-merge');
const path = require('path');

function resolve(dir) {
  return path.resolve(__dirname, dir);
}

const config = merge(baseConfig, {
  output: {
    path: resolve('../dist/'),
    // 对文件进行hash值处理
    filename: '[name]/[name].[chunkhash].js'
  },
  plugins: [
    // 压缩插件
    new webpack.optimize.UglifyJsPlugin()
  ]
});

module.exports = config;