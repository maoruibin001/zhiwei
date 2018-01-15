/**
 * Created by lenovo on 2018/1/14.
 */
let a = [{
  name: 'mao',
  age: 20,
  id: '1'
  },
  {
    name: 'rui',
    age: 21,
    id: '2'
  },
  {
    name: 'bin',
    age: 20,
    id: '3'
  },
];

let b = [
  {
    name: 'rui',
    age: 21,
    id: '2'
  },

  {
    name: 'bin',
    age: 20,
    id: '3'
  },
  {
    name: 'maobin',
    age: 20,
    id: '4'
  },
];
let s = new Set(a);
let k = new Set(b);

function dataType(data) {
  let toString = Object.prototype.toString.call(data);
  return toString.slice(8, -1);
}

function itemInArrayObj(item, arrayObj) {
  arrayObj = arrayObj || [];
  let typeItem = dataType(item);
  let typeArrayObj = dataType(arrayObj);
  if (typeItem !== 'Object') throw new Error('第一个参数类型必须为Object, 实际类型为：' + typeItem);
  if (typeArrayObj !== 'Array') throw new Error('第二个参数类型必须为Array, 实际类型为：' + typeArrayObj);
  arrayObj.forEach((e, i) => {
    let typeE = dataType(e);
    if (typeE !== 'Object') throw new Error(`arrayObj所有子项类型必须为Object, 实际上第${i + 1}项类型为：${typeE}`);
  });
  let keys = Object.keys(item);
  if (keys.length === 0) {
    for (let k of arrayObj) {
      let arrKeys = Object.keys(k);
      if (arrKeys.length === 0) return true;
    }
    return false;
  } else {
    let key = keys[0];
    let ret = arrayObj.filter(e => e[key] === item[key]);
    if (ret.length === 0) {
      return false;
    } else {
      let isIn = false;
      for (let e of ret) {
        let ekeys = Object.keys(e);
        if (keys.length !== ekeys.length) {
          continue;
        } else {
          isIn = keys.every(el => item[el] === e[el]);
          if (isIn) return true;
        }
      }
      return false;
    }
  }
}
let c = [...b].filter(e => !itemInArrayObj(e, a));
let d = [...a].filter(e => !itemInArrayObj(e, b));
console.log(c);
console.log(d);