/**
 * Created by lenovo on 2018/1/15.
 */
const EventEmitter = require('events').EventEmitter;

class CustEmitter extends EventEmitter {

}

const e = new CustEmitter();
e.setMaxListeners(0)

e.on('hello', function(data) {console.log(data);console.log(22)});
e.on('hello', function(data) {console.log(data);console.log(22)});
e.on('hello', function(data) {console.log(data);console.log(22)});
e.on('hello', function(data) {console.log(data);console.log(22)});
e.on('hello', function(data) {console.log(data);console.log(22)});
e.on('hello', function(data) {console.log(data);console.log(22)});
e.on('hello', function(data) {console.log(data);console.log(22)});
e.on('hello', function(data) {console.log(data);console.log(22)});
e.on('hello', function(data) {console.log(data);console.log(22)});
e.on('hello', function(data) {console.log(data);console.log(22)});
e.on('hello', function(data) {console.log(data);console.log(22)});
e.emit('hello', 222)