/**
 * Created by lenovo on 2017/12/4.
 */
const findDescByCode = require('../dictionary/error_dictionary');

const SUCCESSCODE = '000000';
const SUCCESSMSG = '成功';
const ERRORCODE = '999999';
const ERRORMSG = '服务器程序运行错误';

const Util = {
  transformResponse(data, code, errorMsg) {
    errorMsg = errorMsg || '';
    switch (code) {
      case 0 :
        return {
          responseCode: SUCCESSCODE,
          responseMsg: SUCCESSMSG,
          model: data
        }
      case 1 :
        return {
          responseCode: ERRORCODE,
          responseMsg: ERRORMSG,
          model: data
        }
      default:
        return {
          responseCode: code,
          responseMsg: findDescByCode(code, errorMsg),
          model: data
        }
    }
  }
};

module.exports = Util;