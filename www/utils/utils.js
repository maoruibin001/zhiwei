/**
 * Created by lenovo on 2017/12/4.
 */
const findDescByCode = require('../dictionary/error_dictionary');
const DatabaseOperation = require('./database/databaseOperation');

const SUCCESSCODE = '000000';
const SUCCESSMSG = '成功';
const ERRORCODE = '999999';
const ERRORMSG = '失败';
const CHECKERRORCODE = '333333';
const CHECKERRORMSG = '校验不通过';

const Utils = {
  CHECKERRORCODE: CHECKERRORCODE,
  CHECKERRORMSG: CHECKERRORMSG,
  SUCCESSCODE: SUCCESSCODE,
  SUCCESSMSG: SUCCESSMSG,
  ERRORCODE: ERRORCODE,
  ERRORMSG: ERRORMSG,
  transformResponse(data, code, errorMsg) {
    console.log(data);
    errorMsg = errorMsg || '';
    switch (code) {
      case SUCCESSCODE :
        return {
          responseCode: SUCCESSCODE,
          responseMsg: SUCCESSMSG,
          model: data
        }
      case ERRORCODE :
        return {
          responseCode: ERRORCODE,
          responseMsg: errorMsg || ERRORMSG,
          model: data
        }
      case CHECKERRORCODE :
        return {
          responseCode: CHECKERRORCODE,
          responseMsg: errorMsg || CHECKERRORMSG,
          model: data
        }
      default:
        return {
          responseCode: code,
          responseMsg: findDescByCode(code, errorMsg),
          model: data
        }
    }
  },
  saveUserInfo(userData, cb) {
    DatabaseOperation.saveUserInfo(userData, cb);
  },
  matchUserInfo(userData, cb) {
    DatabaseOperation.matchUserInfo(userData, cb);
  },
  checkUserInfo(data, type) {
    type = type || 'register';
    let FIELDRULLS = [];
    if (type === 'register') {
      FIELDRULLS = [
        {
          require: true,
          name: 'name',
          label: '姓名'
        },
        {
          require: true,
          name: 'phone',
          rex: /\d{11}/,
          emptyErr: '电话号码不能为空',
          err: '请输入正确的电话号码'
        },
        {
          require: true,
          name: 'pwd',
          label: '密码'
        },
      ];
    } else if (type === 'login') {
      FIELDRULLS = [
        {
          require: true,
          name: 'phone',
          rex: /\d{11}/,
          emptyErr: '电话号码不能为空',
          err: '请输入正确的电话号码'
        },
        {
          require: true,
          name: 'pwd',
          label: '密码'
        },
      ];
    }

    return this.check(FIELDRULLS, data);
  },
  check(fieldRulls, data) {
    let ret = {}, fildRullList = fieldRulls || [], inValid = false;
    fildRullList.forEach(function (e) {
      let val = data[e.name];
      // 此处不进行空检验
      if (e.rex && !e.rex.test(val) && val) {
        ret[e.name] = e.err || '';
        inValid = true;
      }
      // 此处校验必填字段
      if (e.require && !val) {
        ret[e.name] = e.emptyErr || (e.label ? (e.label + '不能为空') : '') || '';
        inValid = true;
      }
    });

    // 返回值分两种 1、校验通过返回null；2、校验不通过返回具体有哪些不通过的。
    return inValid ? ret : null;
  },
  keepUserRedis() {
  }
};

module.exports = Utils;