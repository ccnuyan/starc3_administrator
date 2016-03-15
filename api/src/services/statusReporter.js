var jwt = require('jwt-simple');
var conf = require('../config/config').getConfig();

var Response = function(status, message) {
  return {
    status: status,
    message: message
  };
};

var success = function(res) {
  res.status(200).send(Response('success', '成功'));
};

var userNotExisted = function(res) {
  res.status(400).send(Response('failure', '用户不存在'));
};

var usernameOrPasswordWrong = function(res) {
  res.status(400).send(Response('failure', '用户名/密码错误'));
};

var authenticationFailed = function(res) {
  res.status(400).send(Response('failure', '未授权'));
};

var toBeModifiedPasswordWrong = function(res) {
  res.status(400).send(Response('failure', '旧密码无法通过验证'));
};

var notAllowed = function(res) {
  res.status(401).send(Response('failure', '不允许这样做'));
};

var codeNotFound = function(res) {
  res.status(400).send(Response('failure', '没有找到代码，可能它已经过期了'));
};

var userValidationError = function(res, error) {
  res.status(400).send(Response('failure', error));
};

var createAndSendToken = function(res, user, clientType) {
  var payload = {
    id: user._id,
    from: 'host',
    to: clientType ? clientType: 'local',
    username: user.username
  };

  var token = jwt.encode(payload, conf.jwtsecret);

  res.status(200).send({
    payload: payload,
    accessToken: token
  });
};


module.exports = {
  userNotExisted: userNotExisted,
  usernameOrPasswordWrong: usernameOrPasswordWrong,
  authenticationFailed: authenticationFailed,
  toBeModifiedPasswordWrong: toBeModifiedPasswordWrong,
  notAllowed: notAllowed,
  success: success,
  createAndSendToken: createAndSendToken,
  userValidationError: userValidationError
};
