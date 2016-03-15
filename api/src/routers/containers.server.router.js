var containers = require('../controllers/containers.server.controller');
var express = require('express');
var router = express.Router();

router.route('/')
  .get(containers.list)
  .post(containers.create);

router.route('/:containerName')
  .get(containers.read)
  .delete(containers.delete);

router.param('containerName', function(req, res, next, name) {
  req.containerName = name;
  next();
});
module.exports = router;
