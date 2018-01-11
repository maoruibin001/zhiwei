/**
 * Created by lenovo on 2018/1/11.
 */
const swap = require('./swap');
function heap(arr) {
  if (arr.length < 2) {
    return arr;
  }

  // 建堆
  let len = arr.length;
  for (let i = parseInt(len / 2); i >= 0; i --) {
    heapify(arr, i, len);
  }
  for (let i = len - 1; i >= 0; i --) {
    swap(arr, 0, i);
    heapify(arr, 0, --len);
  }

  return arr;
}

// 维护堆性质
function heapify(arr, i, len) {
  let left = 2 * i + 1;
  let right = 2 * i + 2;

  let max = i;

  if (left < len && arr[left] > arr[max]) {
    max = left;
  }

  if (right < len && arr[right] > arr[max]) {
    max = right;
  }
  if (max !== i) {
    swap(arr, max, i);
    heapify(arr, max, len);
  }
}



let arr = [1000, 5, 2, 1, 6, 2, 3, 8, 4, 7, 22, 434,23, 55, 21, 999, 0]
// let arr  = [2, 1]
console.log(heap(arr))