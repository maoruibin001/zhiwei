/**
 * Created by lenovo on 2018/1/11.
 */
function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

module.exports = swap;