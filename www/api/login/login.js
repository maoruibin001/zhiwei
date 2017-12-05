/**
 * Created by lenovo on 2017/12/4.
 * 登陆页面服务端代码
 */
const express = require('express');
const router = express.Router();
const Utils = require('../../utils/utils');

/**
 * 从客户端请求数据中过滤出用户信息，保证用户信息中没有垃圾数据
 * @param  {Object} userInfo 客户端请求信息
 * @param  {options} 配置参数 取值有type：表示过滤的那种类型，登陆（login）或者注册（register）默认为login
 * @return {Object} 过滤之后的客户端信息
 */
function filterUserInfo(userInfo, options) {
  options = options || {};

  options.type = options.type || 'login';

  return options.type === 'login' ? {
    phone: userInfo.phone && userInfo.phone + '',
    pwd: userInfo.pwd && userInfo.pwd + '',
  } : {
    name: userInfo.name && userInfo.name + '',
    phone: userInfo.phone && userInfo.phone + '',
    pwd: userInfo.pwd && userInfo.pwd + '',
  }
}
// 登陆接口
router.post('/zhiwei-pc.login', function (req, res) {

  let userInfo = filterUserInfo(req.body, {
    type: 'login'
  });
  // TODO：重点！！校验登陆参数，服务端和客户端必须有相同都校验规则！！
  let invalids = Utils.checkUserInfo(userInfo, 'login');

  if (invalids) {
    // 校验失败回传数据
    let responseData = Utils.transformResponse(userInfo, Utils.CHECKERRORCODE, JSON.stringify(invalids));
    res.status(200).json(responseData);
  } else {

    Utils.matchUserInfo(userInfo, function (err, data) {
      if (err) {
        console.log(err);
        let responseData = Utils.transformResponse(null, Utils.ERRORCODE, JSON.stringify({errorMsg: err}));
        res.status(200).json(responseData);
      } else {
        console.log('用户登录成功');
        res.status(200).json(Utils.transformResponse({
          msg: '登陆成功',
          url: 'http://localhost:8089/index'
        }, Utils.SUCCESSCODE));
      }

    });
  }
});

router.post('/zhiwei-pc.register', function (req, res) {
  let userInfo = filterUserInfo(req.body, {
    type: 'register'
  });
  let invalids = Utils.checkUserInfo(userInfo, 'register');

  if (invalids) {
    let responseData = Utils.transformResponse(userInfo, Utils.CHECKERRORCODE, JSON.stringify(invalids));
    res.status(200).json(responseData);
  } else {
    Utils.saveUserInfo(userInfo, function (err, data) {
      if (err) {
        console.log(err);
        let responseData = Utils.transformResponse(null, Utils.ERRORCODE, JSON.stringify({errorMsg: err}));
        res.status(200).json(responseData);
      } else {
        res.status(200).json(Utils.transformResponse({
          msg: '注册成功',
          url: 'http://localhost:8089/index'
        }, Utils.SUCCESSCODE));
      }
    });
  }

});

module.exports = router;