/**
 * Created by lenovo on 2017/12/4.
 */
const express = require('express');
const router = express.Router();
const Utils = require('../../utils/utils');

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
router.post('/zhiwei-pc.login', function (req, res) {
  console.log('req.body: ', req.body);
  let userInfo = filterUserInfo(req.body, {
    type: 'login'
  });
  console.log('userInfo: ', userInfo);
  let invalids = Utils.checkUserInfo(userInfo, 'login');
  if (invalids) {
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