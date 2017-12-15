/**
 * Created by lenovo on 2017/12/15.
 * 开源首页
 */
const express = require('express');
const router = express.Router();
const Utils = require('../../utils/utils');

// 用户信息接口
router.post('/zhiwei-pc.openMsg',  (req, res) => {
  Utils.redisGet('user_info', function(err, result) {
    if (err) {
      console.log(err);
    } else {
      if (result) {
        let userData = JSON.parse(result);
        console.log('userData: ', userData);
        Utils.getOpenMsgSync(userData.phone).then(function(data) {
          console.log('data: ', data);
          Utils.response(res, {
            data: data,
            code: Utils.SUCCESSCODE,
            errorMsg: null
          }, 'json');
        }, function(err) {
          res.end(err);
        });

      } else {
        Utils.response(res, {
          data: {
            slogan: '程序员的开源提升平台'
          },
          code: Utils.SUCCESSCODE,
          errorMsg: null
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