/**
 * Created by lenovo on 2018/1/15.
 */
const path = require('path');
const _require = module.__proto__.require;
module.__proto__.require = function(...args) {
  let res = _require.apply(this, args);
  let _path = path.resolve(__dirname, './a');
  let currPath = path.resolve(__dirname, args[0]);
  if (_path === currPath) {
    console.log('do something');
  }
  return res;
};

const b = require('./b');

b.p('mao');