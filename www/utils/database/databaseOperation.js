/**
 * Created by lenovo on 2017/12/4.
 * 数据库操作
 */
const mysql = require('mysql');

const DatabaseOperation = {
  // 初始化建表
  init() {
    let createUserBaseInfoTable = `create table if not exists user_base_info(
                                  id int not null auto_increment,
                                  name varchar(40) not null,
                                  phone varchar(40) not null,
                                  pwd varchar(40) not null,
                                  experience varchar(20),
                                  integral varchar(20),
                                  imgUrl varchar(200),
                                  create_time bigint not null,
                                  primary key(id)
                                  );`;

    let createOpenBaseInfoTable = `create table if not exists open_base_info(
                                  id int not null auto_increment,
                                  phone varchar(40) not null,
                                  slogan varchar(100),
                                  primary key(id)
                                  );`;

    let createTableMap = {
      createUserBaseInfoTable: createUserBaseInfoTable,
      createOpenBaseInfoTable: createOpenBaseInfoTable
    }
    for (let key in createTableMap) {
      this.query(createTableMap[key], function (err, result) {
        if (err) {
          console.log(err);
        } else {
          console.log(`数据库表${key}初始化成功`);
        }
      })
    }
  },
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
    connection.query(queryStr, (err, result) => {
      if (err) {
        console.log('[SELECT ERROR] - ', err.message);
        cb(err)
      } else {
        cb(null, result);
      }
    });

    connection.end();
  },

  querySync(queryStr, database) {
    database = database || 'user_info';
    let config = {
      host: 'localhost',
      user: 'root',
      password: '123456',
      port: '3306',
      database: database,
    };
    let connection = mysql.createConnection(config);
    return new Promise((resolve, reject) => {
      connection.connect();
      connection.query(queryStr, (err, result) => {
        if (err) {
          console.log('[SELECT ERROR] - ', err.message);
          reject(err)
        } else {
          resolve(result);
        }
      });

      connection.end();
    })

  },
  /**
   * 根据电话获取用户信息
   * @param  {String} phone 电话号码
   * @param  {Function} cb 回调函数
   */
  getUserByPhone(phone, cb) {
    // 间接防止sql注入
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
    this.checkPhoneRegistered(userInfo, (err, data) => {
      if (err) {
        cb(err);
        console.log(err);
      } else {
        let queryStr = `insert into user_base_info (name, phone, pwd, experience, integral, imgUrl, create_time) VALUES( 
                          '${userInfo.name}',
                          '${userInfo.phone}', 
                          '${userInfo.pwd}', 
                          '${userInfo.experience}', 
                          '${userInfo.integral}', 
                          '${userInfo.imgUrl}', 
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
          cb('该用户信息不存在');
        }
      }
    });
  },


  getOpenMsgSync(phone) {
    let queryStr = `select * from open_base_info where phone='${phone}'`

    return this.querySync(queryStr);
  }
};

DatabaseOperation.init();

module.exports = DatabaseOperation;