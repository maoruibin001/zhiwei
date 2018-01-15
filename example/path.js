/**
 * Created by lenovo on 2018/1/15.
 */
const path = require('path');
const fs = require('fs');
var p = path.resolve(process.execPath, '..', '..', 'lib', 'node_modules');
console.log(fs.existsSync(p));