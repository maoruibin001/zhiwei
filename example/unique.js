/**
 * Created by lenovo on 2018/1/18.
 */
let obj = {name: 'mao'}
let arr = [obj, {age: '20'}, obj];

let set = new Set(arr);
set.delete(e => e.age === '20')
console.log([...set]);