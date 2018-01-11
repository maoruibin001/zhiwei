/**
 * Created by lenovo on 2018/1/10.
 */

for (var i = 0; i < 10; i ++) {
  setTimeout((function(i) {
    return function() {
      console.log(i + 1);
    }
  })(i), i * 1000)
}