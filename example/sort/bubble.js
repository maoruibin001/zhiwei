/**
 * Created by lenovo on 2018/1/11.
 */
const swap = require('./swap');
function bubble(arr) {
  for (let i = 0; i < arr.length; i ++) {
    for (let j = 0; j < arr.length - i - 1; j ++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1);
      }
    }
  }
  return arr;
}

let arr = [5, 2, 1, 6, 2, 3, 8, 4]
console.log(bubble(arr))