/**
 * Created by lenovo on 2018/1/23.
 */
let a = '41231223.673242343244'

function splitByDot(str) {
  let reg =  /(\d)(?=((\d{3})+\.))/g;
  let reg2 = /(\d)(?=(\d{3})+\.)/g;
  return str.replace(reg, function($1, $2) {
    // console.log($2)
    return $2 + ',';
  })
}
console.log(splitByDot(a));




















