/**
 * Created by lenovo on 2017/12/4.
 * 数据库操作
 */
const mysql = require('mysql');

const DatabaseOperation = {
  /**
   * 对数据库进行操作
   * @param  {String} queryStr sql语句
   * @param  {Function} cb 回调函数
   * @param  {String} database 数据库
   */
  query(queryStr, cb, database) {
    database = database ? database : 'user_info';
    let config = {
      host: 'localhost',
      user: 'root',
      password: '123456',
      port: '3306',
      database: database,
    };
    let connection = mysql.createConnection(config);
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
  /**
   * 根据电话获取用户信息
   * @param  {String} phone 电话号码
   * @param  {Function} cb 回调函数
   */
  getUserByPhone(phone, cb) {
    let queryStr = `select * from user_base_info where phone='${phone}'`;
    this.query(queryStr, (err, result) => {
      if (err) {
        cb(err);
      } else {
        cb(null, result);
      }
    });
  },

  /**
   * 检查用户是否注册
   * @param  {Object} userInfo 用户信息
   * @param  {Function} cb 回调函数
   */
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

  /**
   * 保存用户信息到数据库
   * @param  {Object} userInfo 用户信息
   * @param  {Function} cb 回调函数
   */
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
        this.query(queryStr, (err, result) => {
          if (err) {
            cb(err);
          } else {
            cb(null, result);
          }
        });
      }
    });
  },

  /**
   * 根据现有的用户信息匹配用户
   * @param  {Object} userInfo 用户信息
   * @param  {Function} cb 回调函数
   */
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