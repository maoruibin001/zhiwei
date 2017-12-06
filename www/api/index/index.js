/**
 * Created by lenovo on 2017/12/4.
 * 首页服务端代码
 */
const express = require('express');
const router = express.Router();
const Utils = require('../../utils/utils');

// 登陆接口
router.post('/zhiwei-pc.user', function (req, res) {
  Utils.redisGet('user_info', function(err, result) {
    if (err) {
      console.log(err);
    } else {
      if (result) {
        let userData = JSON.parse(result);
        console.log(userData);
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


module.exports = router;