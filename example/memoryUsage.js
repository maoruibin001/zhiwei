// 此处不能直接运行，需要在node --expose-gc memoryUsage.js环境中运行才允许手动垃圾回收
let b = 3;
function memory() {
  // console.log(2, process.memoryUsage());
  let a = new Array(100000);
  a.fill(1);
  global.gc();
  console.log(3, process.memoryUsage().heapUsed);
  return function() {
    // a.push(2)
    console.log('a', b);
    return a;
  }
}
global.gc();
console.log(1, process.memoryUsage().heapUsed)
memory()();
global.gc();
console.log(4, process.memoryUsage().heapUsed)