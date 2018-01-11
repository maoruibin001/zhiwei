/**
 * Created by lenovo on 2018/1/11.
 */
function quick(arr) {
  if (arr.length < 2) {
    return arr;
  }
  let left = [];
  let right = [];
  // let middle = arr[0];
  //
  let middleValue = arr.pop();

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > middleValue) {
      right.push(arr[i]);
    } else {
      left.push(arr[i]);
    }
  }

  return quick(left).concat([middleValue]).concat(quick(right));
}

let arr = [1000, 5, 2, 1, 6, 2, 3, 8, 4, 7, 22, 434,23, 55, 21, 999, 0]
// let arr  = [2, 1]
console.log(quick(arr))