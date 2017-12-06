/**
 * Created by lenovo on 2017/12/6.
 */
const Redis = require('ioredis');
const redis = new Redis(6379, '127.0.0.1');

redis.set('set', 333);
redis.del('set', function(err, result) {
  console.log(result)
});
redis.get('set', function (err, result) {
  console.log(typeof result);
})