/**
 * Created by lenovo on 2017/11/30.
 */
const glob = require('glob');
const path = require('path');

function getEntries(dir, folderLevel) {
  const entries = {};
  let matchDirs = glob.sync(dir);
  let entry, moduleName;
  matchDirs.forEach(e => {
    moduleName = e.split('/')[folderLevel];
    entries[moduleName] = e;
  });
  return entries;
}

let entries = getEntries('../src/*/**.bundle.js', 2);


const config = {
  entry: {},
  plugins: []
}

const pageEntries = getEntries('../src/**/**/index.html', 2);

Object.keys(pageEntries).forEach(page => {
 let pathname = pageEntries[page].replace(/index.html/g, '');
 let moduleName = page;
  console.log(pathname + ':', moduleName);
  var conf = {
    filename: resolve(__dirname, '../dist/' + moduleName +'.html'), //生成的html存放路径，相对于path
    template: resolve(__dirname, pathname + 'index.html'), //html模板路径
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
    }
  };

  if (moduleName in config.entry) {
    // conf.favicon = path.resolve(__dirname, 'src/images/favicon.ico');
    conf.inject = 'body';
    conf.chunks = ['vendors', moduleName];
    conf.hash = true;
  }
});
// pages.forEach(function(page, index) {
//   var moduleName = Object.keys(entries)[index];
//   console.log(Object.keys(entries))
//   var pathname = page.replace(/index.html/g, '');
//
//   var conf = {
//     filename: path.resolve(__dirname, 'assets/' + moduleName +'.html'), //生成的html存放路径，相对于path
//     template: path.resolve(__dirname, pathname + 'index.html'), //html模板路径
//     inject: false, //js插入的位置，true/'head'/'body'/false
//     /*
//      * 压缩这块，调用了html-minify，会导致压缩时候的很多html语法检查问题，
//      * 如在html标签属性上使用{{...}}表达式，很多情况下并不需要在此配置压缩项，
//      * 另外，UglifyJsPlugin会在压缩代码的时候连同html一起压缩。
//      * 为避免压缩html，需要在html-loader上配置'html?-minimize'，见loaders中html-loader的配置。
//      */
//     minify: { //压缩HTML文件
//       removeComments: true, //移除HTML中的注释
//       collapseWhitespace: false //删除空白符与换行符
//     }
//   };
//   if (moduleName in config.entry) {
//     // conf.favicon = path.resolve(__dirname, 'src/images/favicon.ico');
//     conf.inject = 'body';
//     conf.chunks = ['vendors', moduleName];
//     conf.hash = true;
//   }
//   // config.plugins.push(new HtmlWebpackPlugin(conf));
// });