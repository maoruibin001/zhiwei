var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log("master start...");

  // Fork workers.
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('listening', function (worker, address) {
    console.log('listening: worker ' + worker.process.pid + ', Address: ' + address.address + ":" + address.port);
  });

  cluster.on('exit', function (worker, code, signal) {
    console.log('worker ' + worker.process.pid + ' died');
  });
} else {
  console.log(33)
  http.createServer(function (req, res) {
    res.writeHead(200);
    res.end("hello world\n");
  }).listen(4000);
}