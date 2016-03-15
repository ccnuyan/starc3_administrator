var clients = require('../controllers/clients.server.controller');
var express = require('express');
var router = express.Router();


router.route('/')
  .get(clients.list)
  .post(clients.create);

router.route('/:clientId')
  .get(clients.read)
  .put(clients.update)
  .delete(clients.delete);
router.param('clientId', clients.clientByID);
module.exports = router;
