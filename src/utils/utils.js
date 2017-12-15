/**
 * Created by lenovo on 2017/12/4.
 */
import $ from 'jquery';

const SUCCESSCODE = '000000';
const REPONSE_CODE_LOGIN_INVALID = 'user.invalid'; // 响应编码 - 用户失效
const httpBasePath = 'http://localhost:8089';
let isWexin = null;
let appid = '' //TODO:待申请。

const Utils = {
  SUCCESSCODE: SUCCESSCODE,
  REPONSE_CODE_LOGIN_INVALID: REPONSE_CODE_LOGIN_INVALID,

  /**
   * 把服务名称转成URL
   * @param  {string} serviceName 服务名称
   * @param  {string} serviceType 服务前缀
   * @param  {string} basePath 基本路径
   */
  apiUrl(serviceName, serviceType, basePath) {
    if (!serviceType) {
      serviceType = 'zhiwei-pc';
    }
    return basePath + 'los/' + serviceType + '.' + serviceName;
  },

  /**
   * 请求服务，统一封装，用于之后做一些统一处理
   * @param  {string}   serviceName 服务名称
   * @param  {Object}   params      参数
   * @param  {Function} cb(error, model, resp, textStatus, jqXHR/XMLHttpRequest, errorThrown)
   * @param  {string}   serviceType 服务前缀， 默认zuche-intf-rent
   * @param  {string}   method      默认POST
   * @param  {object}   options         扩展参数
   */
  ajax(serviceName, params, cb, serviceType, method, options) {
    params = $.extend({}, params, {
      _client_version_no: '1.0.0'
    });
    let url = this.apiUrl(serviceName, serviceType, options ? options.basePath : '/');
    // console.log(url, params);
    let opts = {
      url: url,
      type: method || 'POST',
      dataType: 'json',
      jsonp: false, // JQuery有bug，如果Content-Type是application/json，表单里有两个连续的??，就会引起bug， jquery就会把请求结果当成jsonp，用script方式来执行结果
      data: params,
      success: (resp, textStatus, jqXHR) => {
        if (resp.responseCode === this.SUCCESSCODE) {
          cb && cb(null, resp.model, resp, textStatus, jqXHR);
        }
        // else if (resp.responseCode === this.REPONSE_CODE_LOGIN_INVALID && (!options || options.checkLogin !== false)) { // 未登录/登录超时 - 跳转到登录页面
        //   // TODO:功能待完善
        //   if (this.isWeixin()) {
        //     this.weichatLogin();
        //   } else {
        //     window.location.href = httpBasePath + '/login?target=' + encodeURIComponent(window.location.href);
        //   }
        // }
        else {
          cb && cb((resp.responseMsg != '' ? resp.responseMsg : (resp.responseCode + '#' + resp.responseMsg)), undefined, resp, textStatus, jqXHR);
        }
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        console.log(errorThrown);
        cb && cb(textStatus || '请求失败', undefined, null, textStatus, XMLHttpRequest, errorThrown);
      }
    };

    if (typeof options === 'object') {
      $.extend(opts, ext);
    }

    $.ajax(opts);
  },
  /**
   * 微信授权登录
   * @param  {target}   target 授权完成的回调
   */
  weichatLogin(target) {
    if (!target) {
      target = window.location.href;
    }
    let redirect = encodeURIComponent(httpBasePath + '/los/zhiwei-pc.login') + '?mainUrl=' + encodeURIComponent(target);
    let authUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appid + '&redirect_uri=' + redirect + '&response_type=code&scope=snsapi_userinfo,snsapi_base&state=123&connect_redirect=1#wechat_redirect';
    window.location.href = authUrl;
  },
  isWeixin() {
    if (isWexin === null) {
      isWexin = !!navigator.userAgent.match(/MicroMessenger/ig);
    }
    return isWexin;
  },
  isAlipay() {
    let userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.match(/Alipay/i) == "alipay") {
      return true;
    } else {
      return false;
    }
  },

  url2object(str) {
    if (!str) {
      str = window.location.search;
    }

    str = str.substring(1); // 去掉问号

    let keyVals = str.split('&');

    let params = {};

    for (let item of keyVals) {
      let keyValItems = item.split('=');
      if (keyValItems.length !== 2) continue;
      params[keyValItems[0]] = keyValItems[1];
    }

    return params;
    // var keyVals = str.split('&'); // 按&分割
    // var params = {};
    // for (var i = 0; i < keyVals.length; i++) {
    //   var keyVal = keyVals[i];
    //   // 按照=分割
    //   var splitIndex = keyVal.indexOf('=');
    //   if (splitIndex !== -1) {
    //     params[keyVal.substring(0, splitIndex)] = keyVal.substring(splitIndex + 1);
    //   }
    // }
    // return params;
  }
};


export default Utils;