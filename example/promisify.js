/**
 * Created by lenovo on 2018/1/15.
 */
const util = require('util');
function promisify(fn) {
  return function(...args) {
    return new Promise((resolve, reject) => {
      let args2 = [...args, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      }]
      fn.apply(this, args2)
    })
  }
}
const fs = require('fs');

let readFile = promisify(fs.readFile);


readFile('./import.js').then((data) => {
  console.log(data);
  console.log('success');
}, err => {
  console.log('error', err);
})