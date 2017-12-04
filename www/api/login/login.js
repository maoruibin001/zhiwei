/**
 * Created by lenovo on 2017/12/4.
 */
const express = require('express');
const router = express.Router();
const Util = require('../../util/util');

router.post('/login', function (req, res) {
  let responseData = Util.transformResponse(req.body, 0);
  res.json(responseData);
});

router.post('/register', function (req, res) {
  let requiredObj = {
    name: '',
    phone: ''
  }
  let responseData = Util.transformResponse(req.body, 2, JSON.stringify(requiredObj));
  res.json(responseData);
});

module.exports = router;