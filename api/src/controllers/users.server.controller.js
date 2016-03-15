var path = require('path');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var _ = require('lodash');

var statusReporter = require('../services/statusReporter.js');

exports.read = function(req, res) {
  User.findOne({
    username: req.query.username
  }, function(err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return statusReporter.userNotExisted(res);
    }
    res.status(200).send(user.toJSON());
  });
};

exports.resetpwd = function(req, res, next) {
  User.findOne(req.query.username).exec(function(err, userReturn) {
    if (err) {
      return next(err);
    }
    if (!userReturn) {
      return reporter.userNotExisted(res);
    }
    userReturn.password = userReturn.username;

    userReturn.save(function(err, userSaved) {
      if (err) {
        next(err);
      } else {
        return statusReporter.success(res);
      }
    });
  });
};
