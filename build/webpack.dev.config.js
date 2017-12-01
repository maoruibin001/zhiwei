/**
 * Created by lenovo on 2017/11/9.
 * 本地开发环境配置
 */
const baseConfig = require('./webpack.base.config');
const webpack = require('webpack');
// 合并组件，比手动合并更安全
const merge = require('webpack-merge');
// 想要热更新必须满足entry入口配置
for (let key in baseConfig.entry) {
  if (key !== 'vendors') {
    baseConfig.entry[key] = ['webpack-hot-middleware/client?reload=true'].concat(baseConfig.entry[key]);
  }
}

const config = merge(baseConfig, {
  plugins: [
    // 热更新插件
    new webpack.HotModuleReplacementPlugin()
  ]
});
module.exports = config;

