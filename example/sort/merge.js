/**
 * Created by lenovo on 2018/1/11.
 */
function merge(arr) {
  if (arr.length < 2) {
    return arr;
  }

  let middle = parseInt(arr.length / 2);

  let left = arr.slice(0, middle);
  let right = arr.slice(middle);

  return mergeify(merge(left), merge(right));
}

function mergeify(left, right) {
  let ret = [];
  while (left.length > 0 && right.length > 0) {
    if (left[0] < right[0]) {
      ret.push(left.shift());
    } else {
      ret.push(right.shift());
    }
  }

  if (left.length > 0) {
    ret = ret.concat(left);
  }

  if (right.length > 0) {
    ret = ret.concat(right);
  }

  return ret;
}


let arr = [1000, 5, 2, 1, 6, 2, 3, 8, 4, 7, 22, 434,23, 55, 21, 999, 0]
// let arr  = [2, 1]
console.log(merge(arr))