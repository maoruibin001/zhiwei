/**
 * Created by lenovo on 2018/1/20.
 */
// 配置定时任务，每天10点从https://cnodejs.org拉取今天的内容
const schedule = require("node-schedule");
const craw = require('../www/craw/craw');
const Utils = require('../www/utils/utils');


// let rule = new schedule.RecurrenceRule();
// rule.dayOfWeek = [0, new schedule.Range(1, 6)];
// rule.hour = 16;
// rule.minute = 24;


let rule = new schedule.RecurrenceRule();

let times = [];

for(let i=1; i<60; i+=5){

  times.push(i);

}

rule.second = times;


function task() {
  console.log('定时拉取爬虫任务初始化成功');
  schedule.scheduleJob(rule, function(){
    console.log("执行抓取网页任务");
    craw((err, data) => {
      // 将内容存入redis
      if (err) {
        console.log('定时任务报错，及时处理');
        return;
      }
      Utils.redisSet('infoList', data);
      console.log('更新缓存成功');
    });
  });
}

task();
module.exports = task;