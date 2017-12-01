/**
 * Created by lenovo on 2017/11/30.
 */
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'maoruibin'
});

connection.connect();

connection.query('SELECT * from user_info where user_name="maoruibin";', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results);
});

connection.end();