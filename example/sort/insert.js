/**
 * Created by lenovo on 2018/1/11.
 */
const swap = require('./swap');

function insert(arr) {
  for (let i = 0; i < arr.length; i ++) {
    let j = i + 1;
    if (arr[i] > arr[j]) {
      let temp = arr[j],
          flag = j;
      for (let k = i; k >= 0 && arr[k] > temp; k--) {
        arr[k + 1] = arr[k];
        flag = k;
      }
      arr[flag] = temp;
    }
  }

  return arr;
}


let arr = [1000, 5, 2, 1, 6, 2, 3, 8, 4, 7, 22, 434,23, 55, 21, 999, 0]
// let arr  = [2, 1]
console.log(insert(arr))