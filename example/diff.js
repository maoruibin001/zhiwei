/**
 * Created by lenovo on 2018/1/12.
 */
// 获取两个数组中不同元素
function getDiff(list1, list2) {
  if (list1.length < 1) {
    return list2;
  }
  if (list2.length < 2) {
    return list1;
  }
  var diff1 = [];
  var diff2 = [];

  list1.forEach(function(e) {
    var ret = list2.filter(function(ele) {
      return ele === e;
    });
    if (ret.length === 0) {
      diff1.push(e);
    }
  });

  list2.forEach(function(e) {
    var ret = list1.filter(function(ele) {
      return ele === e;
    });
    if (ret.length === 0) {
      diff2.push(e);
    }
  });

  return diff1.concat(diff2);
}

var list1 = [1, 2, 3, 5];
var list2 = [2, 4];

console.log(getDiff(list1, list2));