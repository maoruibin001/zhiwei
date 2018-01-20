/**
 * Created by lenovo on 2017/12/6.
 */
const index = require('./index/index');
const login = require('./login/login');
const open = require('./open/open');
const info = require('./info/info');

let routerList = [index, login, open, info];
function API(app, dir) {
  dir = dir || '/'
  for(let item of routerList) {
    app.use(dir, item);
  }
}
module.exports = API;