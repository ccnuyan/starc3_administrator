var path = require('path');
var mongoose = require('mongoose');
var Client = mongoose.model('Client');
var _ = require('lodash');

var swiftInitializer = require('../services/swiftInitializer.js');

exports.list = function(req, res, next) {
  swiftInitializer.init(function(err, swift) {
    if (err) {
      return next(err);
    }
    swift.listContainers(function(err, ret) {
      if (err) {
        return next(err);
      }
      var containers = JSON.parse(ret.body);
      res.status(200).send(containers);
    });
  });
};

exports.read = function(req, res, next) {
  swiftInitializer.init(function(err, swift) {
    if (err) {
      return next(err);
    }
    swift.retrieveContainerMetadata(req.containerName, function(err, ret) {
      if (err) {
        return next(err);
      }
      res.status(200).send(ret.body);
    });
  });
};

exports.create = function(req, res, next) {
  swiftInitializer.init(function(err, swift) {
    if (err) {
      return next(err);
    }
    swift.createContainer(req.body.name, function(err, ret) {
      if (err) {
        return next(err);
      }
      res.status(200).send(ret.body);
    });
  });
};

exports.delete = function(req, res, next) {
  swiftInitializer.init(function(err, swift) {
    if (err) {
      return next(err);
    }
    swift.clearContainer(req.containerName, function(err, ret) {
      if (err) {
        return next(err);
      }
      res.status(200).send(ret.body);
    });
  });
};
