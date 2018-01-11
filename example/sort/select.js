/**
 * Created by lenovo on 2018/1/11.
 */
const swap = require('./swap');
function select(arr) {
  for (let i = 0; i < arr.length; i ++) {
   let min = i;
   for (let j = i + 1; j < arr.length; j ++) {
     if (arr[j] < arr[min]) {
       min = j;
     }
   }
   swap(arr, min, i);
  }
  return arr;
}

let arr = [5, 2, 1, 6, 2, 3, 8, 4]
console.log(select(arr))