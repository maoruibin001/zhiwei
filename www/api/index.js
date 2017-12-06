/**
 * Created by lenovo on 2017/12/6.
 */
const index = require('./index/index');
const login = require('./login/login');

function API(app, dir) {
  dir = dir || '/'
  app.use(dir, index);
  app.use(dir, login);
}
module.exports = API;