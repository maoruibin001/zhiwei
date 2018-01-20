/**
 * Created by lenovo on 2018/1/20.
 */
const cheerio = require('cheerio');
const superagent = require('superagent');
const LIMITINDEX = 100; //最多存100条。
const fs = require('fs');
const path = require('path');

let PAGENO = 1;

let ORIGINURL = 'https://cnodejs.org';
let items = [];
function grabInfoFromOrigin(cb, originUrl, pageNo) {

  let query = '/?tab=all&page=' + pageNo || PAGENO;
  let targetUrl = originUrl || ORIGINURL + query;
  superagent.get(targetUrl)
    .end(function (err, sres) {
      // 常规的错误处理
      if (err) {
        return next(err);
      }
      // sres.text 里面存储着网页的 html 内容，将它传给 cheerio.load 之后
      // 就可以得到一个实现了 jquery 接口的变量，我们习惯性地将它命名为 `$`
      // 剩下就都是 jquery 的内容了
      let $ = cheerio.load(sres.text);

      $('#topic_list .topic_title').each( (idx, element) => {
        let $element = $(element);
        if (items.length < LIMITINDEX) {
          items.push({
            title: $element.attr('title'),
            href: ORIGINURL + $element.attr('href')
          });
        }
      });
      if (items.length < LIMITINDEX) {
        pageNo ++;
        grabInfoFromOrigin(cb, ORIGINURL, pageNo);
      } else {
        let itemsJSON = JSON.stringify(items);
        let itemBuffer = new Buffer(itemsJSON);
        fs.open(path.resolve(__dirname, '../api/info/data/info.json'), 'w+', function(err, fd) {
          if (err) {
           console.error(err);
            typeof cb === 'function' && cb(err);
            return;
          }
          console.log("文件打开成功！");
          console.log("准备读取文件！");
          fs.write(fd, itemBuffer, function(err, bytes){
            if (err){
              console.log(err);
              typeof cb === 'function' && cb(err);
            }

            // 仅输出读取的字节
            if(bytes > 0){
              // console.log(itemBuffer.slice(0, bytes).toString());
            }

            // 关闭文件
            fs.close(fd, function(err){
              if (err){
                console.log(err);
                typeof cb === 'function' && cb(err);
              }
              console.log("文件关闭成功");
              console.log(typeof cb)
              typeof cb === 'function' && cb(null, itemsJSON);
            });
          });
        });
      }
    });
}

module.exports = grabInfoFromOrigin;
