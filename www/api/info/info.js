/**
 * Created by lenovo on 2018/1/20.
 */
const express = require('express');
const router = express.Router();
const Utils = require('../../utils/utils');
const fs = require('fs');
const path = require('path');

// 用户信息接口
router.post('/zhiwei-pc.info',  (req, res) => {
  let pageNo = parseInt(req.body.pageNo || Utils.PAGENO);
  let pageSize = parseInt(req.body.pageSize || Utils.PAGESIZE);
  fs.readFile(path.resolve(__dirname, './data/info.json'), (err, data) => {
    if (err) {
      Utils.response(res, {
        data: null,
        code: Utils.ERRORCODE,
        errorMsg: err
      }, 'json');
    } else {
      console.log(req.body.pageNO)
      console.log((pageNo - 1 ) * pageSize)
      console.log((pageNo - 1 ) * pageSize + pageSize)
      let infoList = JSON.parse(data).slice((pageNo - 1 ) * pageSize, (pageNo - 1 ) * pageSize + pageSize);
      console.log('infoList', infoList);
      Utils.response(res, {
        data: infoList,
        code: Utils.SUCCESSCODE,
        errorMsg: null
      }, 'json');
    }
  })
});

module.exports = router;