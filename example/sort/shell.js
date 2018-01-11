/**
 * Created by lenovo on 2018/1/11.
 */
/**
 * Created by lenovo on 2018/1/11.
 */
const swap = require('./swap');

function shell(arr) {
  let times = 2;
  let len = arr.length;
  let gap = 1;

  while(len / times > gap) {
    gap = gap * times + 1;
  }

  // console.log(gap)
  for (gap; gap >= 1; gap = parseInt(gap / times)) {
    for (let i = 0; i < len - gap; i ++) {
      if (arr[i] > arr[i + gap]) {
        let temp = arr[i + gap];
        let flag = i + gap;
        for (let j = i; j >= 0 && arr[j] > temp; j -= gap) {
          arr[j + gap] = arr[j];
          flag = j;
        }
        arr[flag] = temp;
      }
    }
  }

  return arr;
}



let arr = [1000, 5, 2, 1, 6, 2, 3, 8, 4, 7, 22, 434,23, 55, 21, 999, 0]
// let arr  = [2, 1]
console.log(shell(arr))