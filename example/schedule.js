/**
 * Created by lenovo on 2018/1/8.
 */
const schedule = require('node-schedule');
const axios = require('axios');
const fs = require('fs');
const cheerio = require('cheerio');

function getBaidu() {
  axios.get('https://www.jianshu.com/').then((data) => {
    // console.log(data.data);
    var div = '<div id="p333"><div>32434</div>323423423</div>'
    let $ = cheerio.load(div);
    console.log($.html())
    // fs.open('./index.html', 'w+', (err, fd) => {
    //   fs.write(fd, data.data, function(err, written, string){
    //     if(err){
    //       throw err;
    //     }
    //     console.log('written: ', written);
    //     console.log('string: ', string);
    //
    //     fs.close(fd,function(err){
    //       if(err){
    //         throw err;
    //       }
    //       console.log('file closed');
    //     })
    //   })
    // })
  })

}

getBaidu();