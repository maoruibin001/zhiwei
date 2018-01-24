/**
 * Created by lenovo on 2018/1/24.
 */
const EventEmitter = require('events').EventEmitter;

class CustE extends EventEmitter {

}

let custE = new CustE();

custE.on('hello bul', function() {
  console.log(222)
});

custE.emit('bul')