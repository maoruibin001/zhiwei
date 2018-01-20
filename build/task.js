/**
 * Created by lenovo on 2018/1/20.
 */
// 配置定时任务，每天10点从https://cnodejs.org拉取今天的内容
const schedule = require("node-schedule");
const craw = require('../www/craw/craw');
let rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [0, new schedule.Range(1, 6)];
rule.hour = 10;
rule.minute = 0;
function task() {
  console.log('定时拉取爬虫任务初始化成功');
  schedule.scheduleJob(rule, function(){
    console.log("执行抓取网页任务");
    craw();
  });
}
module.exports = task;