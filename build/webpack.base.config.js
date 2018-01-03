/**
 * Created by lenovo on 2017/11/9.
 * webpack 基本配置。
 */
const path = require('path');
const webpack = require('webpack');
const glob = require('glob');
const ENTRYHTMLMODULE = 'hello';


// 提取css文件插件
const ExtraTextPlugin = require('extract-text-webpack-plugin');
// 提取html文件插件
const HtmlPlugin = require('html-webpack-plugin');

const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

// 彩色提示插件
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

const headers = require('./head').headers;


/*
 * 根据给定的相对路径返回正确的绝对路径
 * @param  {String} dir  相对路径
 * @return {String} 绝对路径
 * */
function resolve(dir) {
  return path.resolve(__dirname, dir);
}
/*
 * 获取入口文件
 * @param  {String} dir  路径匹配规则
 * @param  {Number} folderLevel 入口名取第几级文件目录
 * @return {Object} 入口文件对象
 * */
function getEntries(dir, folderLevel) {
  const entries = {};
  let matchDirs = glob.sync(dir);
  let entry, moduleName;
  matchDirs.forEach(e => {
    moduleName = e.split('/')[folderLevel];
    entries[moduleName] = resolve('../' + e);
  });
  return entries;
}

let entries = getEntries('src/**/**.bundle.js', 1);

let chunks = Object.keys(entries);

// webpack公用配置（生产和开发环境都需要）
const config = {
  // 单页面单入口配置
  entry: Object.assign({}, entries, {
    'vendors': ['react', 'react-dom']
  }),
  // output: {
  //   path: resolve('../dist'),
  //   filename: '[name]/[name].bundle.js'
  // },
  module: {
    rules: [
      {
        // 此处需要和.babelrc的preset配合才能正常工作
        test: /\.js$/,
        loader: 'babel-loader',
        include: resolve('../src')
      },
      // {
      //   test: /\.html$/,
      //   loader: "html-loader?-minimize" //避免压缩html,https://github.com/webpack/html-loader/issues/50
      // },
      // {
      //   test: /\.ejs$/,
      //   loader: 'ejs-loader'
      // },
      {
        // css提取并自动加上前缀，兼容IE8、firefox20 安卓4.4及以后
        test: /\.css$/,
        loader: ExtraTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader',
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: (loader) => [
                  require('autoprefixer')({
                    browsers: ["ie >= 8", "Firefox >= 20", "Android >= 4.4"]
                  })
                ]
              }
            }
          ]
        })
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  // 可以使用externals来优化打包速度，但是看不到打包过程，因此这里依旧采用传统打包方式
  // externals: {
  //   'react': 'window.React',
  //   'react-dom': 'window.ReactDOM'
  // },
  plugins: [

    new FriendlyErrorsPlugin(),
    new ExtraTextPlugin({
      filename: 'css/[name].css'
    }),
    // new HtmlPlugin({
    //   template: resolve('../src/app/index.html')
    // }),
    new webpack.optimize.CommonsChunkPlugin({
      // 此处必须加上manifest，否则每次修改文件模块的时候公共模块hash也会变化
      names: ['vendors', 'manifest']
    }),
  ]
};

const pageEntries = getEntries('src/**/index.html', 1);
Object.keys(pageEntries).forEach(page => {
  let pathname = pageEntries[page].replace(/index.html/g, '');
  let moduleName = page;
  let conf = {
    filename: path.join(resolve('../dist'), '/' + moduleName + '/index.html'), //生成的html存放路径，相对于path
    template: path.join(pathname, 'index.html'), //html模板路径
    inject: false, //js插入的位置，true/'head'/'body'/false
    /*
     * 压缩这块，调用了html-minify，会导致压缩时候的很多html语法检查问题，
     * 如在html标签属性上使用{{...}}表达式，很多情况下并不需要在此配置压缩项，
     * 另外，UglifyJsPlugin会在压缩代码的时候连同html一起压缩。
     * 为避免压缩html，需要在html-loader上配置'html?-minimize'，见loaders中html-loader的配置。
     */
    minify: { //压缩HTML文件
      removeComments: true, //移除HTML中的注释
      collapseWhitespace: false //删除空白符与换行符
    },
    headers: headers
  };

  if (moduleName in config.entry) {
    // conf.favicon = path.resolve(__dirname, 'src/images/favicon.ico');
    conf.inject = 'body';
    conf.chunks = ['vendors','manifest', moduleName];
    conf.hash = true;
  }
  config.plugins.push(new HtmlPlugin(conf));
});

// config.plugins.push(new HtmlWebpackHarddiskPlugin({
//   outputPath: resolve('../dist')
// }));
module.exports = config;