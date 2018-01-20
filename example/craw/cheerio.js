/**
 * Created by lenovo on 2018/1/20.
 */
const cheerio = require('cheerio');


let str = '<div>hello world <span>の33</span></div>';
let $ = cheerio.load(str);

console.log($.html());