/**
 * Created by lenovo on 2018/1/15.
 */
const path = require('path');
const _require = module.__proto__.require;
module.__proto__.require = function(...args) {
  let res = _require.apply(this, args);
  let _path = path.resolve(__dirname, './a');
  let currPath = path.resolve(__dirname, args[0]);
  console.log(args[0])
  if (_path === currPath) {
    console.log('do something');
  }
  return res;
};
const fs = require('fs')
const b = require(path.resolve(__dirname, './b'));

b.p('mao');