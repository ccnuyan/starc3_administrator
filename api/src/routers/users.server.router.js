var users = require('../controllers/users.server.controller');
var express = require('express');
var router = express.Router();


router.route('/')
  .get(users.read)
  .put(users.resetpwd);
module.exports = router;
