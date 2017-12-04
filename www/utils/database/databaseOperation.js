/**
 * Created by lenovo on 2017/12/4.
 */
const mysql = require('mysql');

const DatabaseOperation = {
  save(queryStr, cb) {
    let connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '123456',
      port: '3306',
      database: 'user_info',
    });
    connection.connect();
    connection.query(queryStr,  (err, result) => {
      if (err) {
        console.log('[SELECT ERROR] - ', err.message);
        cb(err)
      } else {
        cb(null, result);
      }
    });

    connection.end();
  },
  getUserByPhone(phone, cb) {
    let queryStr = `select * from user_base_info where phone='${phone}'`;
    this.save(queryStr, (err, result) => {
      if (err) {
        cb(err);
      } else {
        cb(null, result);
      }
    });
  },
  checkPhoneRegistered(userInfo, cb) {
    this.getUserByPhone(userInfo.phone, (err, result) => {
      if (err) {
        cb(err);
      } else {
        if (!result[0]) {
          cb(null);
        } else {
          cb('该手机号已经注册');
        }
      }
    });
  },
  saveUserInfo(userInfo, cb) {
    this.checkPhoneRegistered(userInfo,  (err, data) => {
      if (err) {
        cb(err);
        console.log(err);
      } else {
        let queryStr = `insert into user_base_info (name, phone, pwd, create_time) VALUES( 
                          '${userInfo.name}',
                          '${userInfo.phone}', 
                          '${userInfo.pwd}', 
                          ${new Date().getTime()}
                          );
                `;
        this.save(queryStr, (err, result) => {
          if (err) {
            cb(err);
          } else {
            cb(null, result);
          }
        });
      }
    });
  },
  matchUserInfo(userInfo, cb) {
    this.getUserByPhone(userInfo.phone, (err, result) => {
      if (err) {
        cb(err);
      } else {
        if (result[0]) {
          if (userInfo.pwd === result[0].pwd) {
            cb(null, result[0]);
          } else {
            cb('用户名密码不匹配');
          }
        } else {
          cb('该用户信息不存在');        }
      }
    });
  }
};
module.exports = DatabaseOperation;