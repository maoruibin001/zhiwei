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
router.post('/login', function (req, res) {
  let userInfo = filterUserInfo(req.body, {
    type: 'login'
  });
  let invalids = Utils.checkUserInfo(userInfo, 'login');
  if (invalids) {
    let responseData = Utils.transformResponse(userInfo, Utils.CHECKERRORCODE, JSON.stringify(invalids));
    res.json(responseData);
  } else {
    Utils.matchUserInfo(userInfo, function (err, data) {
      if (err) {
        console.log(err);
        res.json(Utils.transformResponse({errorMsg: err}), Utils.ERRORCODE);
      } else {
        console.log('用户登录成功');
        res.json(Utils.transformResponse({
          msg: '注册成功',
          url: 'http://localhost:8089/index'
        }, Utils.SUCCESSCODE));
      }

    });
  }
});

router.post('/register', function (req, res) {
  let userInfo = filterUserInfo(req.body, {
    type: 'register'
  });
  let invalids = Utils.checkUserInfo(userInfo, 'register');

  if (invalids) {
    let responseData = Utils.transformResponse(userInfo, Utils.CHECKERRORCODE, JSON.stringify(invalids));
    res.json(responseData);
  } else {
    Utils.saveUserInfo(userInfo, function (err, data) {
      if (err) {
        console.log(err);
        res.json(Utils.transformResponse(null, Utils.ERRORCODE, JSON.stringify({errorMsg: err})));
      } else {
        res.json(Utils.transformResponse({
          msg: '注册成功',
          url: 'http://localhost:8089/index'
        }, Utils.SUCCESSCODE));
      }
    });
  }

});

module.exports = router;