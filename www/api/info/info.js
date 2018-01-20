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
  Utils.redisGet('infoList', (err, data) => {
    if (err) {
      console.log('err: ' , err);
    } else {
      if (data) {
        console.log('直接从缓存拿数据');
        let infoList = JSON.parse(data).slice((pageNo - 1 ) * pageSize, (pageNo - 1 ) * pageSize + pageSize);
        Utils.response(res, {
          data: infoList,
          code: Utils.SUCCESSCODE,
          errorMsg: null
        }, 'json');
      } else {
        console.log('读取info.json文件');
        fs.readFile(path.resolve(__dirname, './data/info.json'), (err, data) => {
          if (err) {
            Utils.response(res, {
              data: null,
              code: Utils.ERRORCODE,
              errorMsg: err
            }, 'json');
          } else {
            Utils.redisSet('infoList', data);
            let infoList = JSON.parse(data).slice((pageNo - 1 ) * pageSize, (pageNo - 1 ) * pageSize + pageSize);
            Utils.response(res, {
              data: infoList,
              code: Utils.SUCCESSCODE,
              errorMsg: null
            }, 'json');
          }
        })
      }
    }
  });

});

module.exports = router;