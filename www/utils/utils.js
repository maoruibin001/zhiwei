/**
 * Created by lenovo on 2017/12/4.
 * 工具箱
 */

const findDescByCode = require('../dictionary/error_dictionary');
const DatabaseOperation = require('./database/databaseOperation');


const SUCCESSCODE = '000000'; //成功返回code
const SUCCESSMSG = '成功'; //成功描述
const ERRORCODE = '999999';//失败返回code
const ERRORMSG = '失败';//失败描述
const CHECKERRORCODE = '333333';//校验失败返回code
const CHECKERRORMSG = '校验不通过';//校验失败描述
const OPENSESSION = true; //是否开启session校验。

const Utils = {
  OPENSESSION: OPENSESSION,
  CHECKERRORCODE: CHECKERRORCODE,
  CHECKERRORMSG: CHECKERRORMSG,
  SUCCESSCODE: SUCCESSCODE,
  SUCCESSMSG: SUCCESSMSG,
  ERRORCODE: ERRORCODE,
  ERRORMSG: ERRORMSG,

  /**
   * 处理返回给客户端的数据
   * @param  {Object} data 服务器待返回的数据
   * @param  {String} code 返回的code码
   * @param  {String} errorMsg 返回的错误描述信息
   *
   * @return {Object} 处理后待返回的对象
   */
  transformResponse(data, code, errorMsg) {
    console.log(data);
    errorMsg = errorMsg || '';
    code = code || SUCCESSCODE;
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
          responseMsg: findDescByCode(CHECKERRORCODE, errorMsg),
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
  /**
   * 保存用户信息
   * @param  {Object} userData 用户数据
   * @param  {Function} cb 回调函数
   */
  saveUserInfo(userData, cb) {
    DatabaseOperation.saveUserInfo(userData, cb);
  },
  /**
   * 检查此用户是否注册
   * @param  {Object} userData 用户数据
   * @param  {Function} cb 回调函数
   */
  matchUserInfo(userData, cb) {
    DatabaseOperation.matchUserInfo(userData, cb);
  },

  /**
   * 校验用户信息，校验规则必须和客户端相同。
   * @param  {Object} userData 用户数据
   * @param  {String} type 校验的是登录（login）还是注册（register）数据
   *
   * @return {Object} 校验结果
   */
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

  /**
   * 校验。
   * @param  {Array} fieldRulls 校验规则
   * @param  {Object} data 待校验数据
   *
   * @return {Object} 校验结果，如果通过校验则返回null，不通过返回不通过字段组成的对象。
   */
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
  },

  setSession(req, phone) {
    console.log('req.session: ', req.session);
    req.session['phone'] = phone;
  },

  checkSession(req) {
    return req.session['phone'] || null;
  },

  /**
   * 对响应统一封装
   * @param  {Object} res 响应对象
   * @param  {Object} options 待响应数据 分为三个选项：{data： 待返回数据, code: 状态码, errorMsg: 错误信息}
   * @param  {String} type 类型
   */
  response(res, options, type) {
    options = options || {};
    switch (type) {
      case 'qita':
        break;
      default:
        res.status(200).json(this.transformResponse(options.data, options.code, options.errorMsg));
    }
  }
};

module.exports = Utils;