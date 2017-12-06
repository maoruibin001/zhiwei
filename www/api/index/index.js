/**
 * Created by lenovo on 2017/12/4.
 * 首页服务端代码
 */
const express = require('express');
const router = express.Router();
const Utils = require('../../utils/utils');

// 登陆接口
router.post('/zhiwei-pc.user', function (req, res) {
  let user = Utils.checkSession(req)
  // res.status(200).json(Utils.transformResponse(user));
  Utils.response(res, {
    data: user
  }, 'json');
});


module.exports = router;