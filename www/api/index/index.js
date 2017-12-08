/**
 * Created by lenovo on 2017/12/4.
 * 首页服务端代码
 */
const express = require('express');
const router = express.Router();
const Utils = require('../../utils/utils');

// 用户信息接口
router.post('/zhiwei-pc.user',  (req, res) => {
  Utils.redisGet('user_info', function(err, result) {
    if (err) {
      console.log(err);
    } else {
      if (result) {
        let userData = JSON.parse(result);
        Utils.response(res, {
          data: userData
        }, 'json');
      } else {
        Utils.response(res, {
          data: null,
          code: Utils.REPONSE_CODE_LOGIN_INVALID,
          errorMsg: Utils.REPONSE_DESC_LOGIN_INVALID
        }, 'json');
      }

    }
  })

});

//登出接口
router.post('/zhiwei-pc.signOut', (req, res) => {
  Utils.signOut(req);
  Utils.response(res, {
    data: {
      msg: '退出成功',
      url: 'http://localhost:8089/login'
    }
  }, 'json');
});



module.exports = router;