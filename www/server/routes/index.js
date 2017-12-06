var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var user={
    name:"Chen-xy",
    age:"22",
    address:"bj"
  }
  req.session.user=user;
  console.log(req.session.user)
  res.render('index', {
    title: 'the test for nodejs session' ,
  });
});


module.exports = router;
