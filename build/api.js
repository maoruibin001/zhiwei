/**
 * Created by lenovo on 2017/12/4.
 */
const express = require('express');
const router = express.Router();

router.post('/login', function(req, res) {
  res.json(req.body)
});

module.exports = router;