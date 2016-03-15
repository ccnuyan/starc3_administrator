var path = require('path');
var mongoose = require('mongoose');
var Client = mongoose.model('Client');
var _ = require('lodash');

var swiftInitializer = require('../services/swiftInitializer.js');

exports.list = function(req, res, next) {
  Client.find().lean().exec(function(err, clients) {
    if (err) {
      return next(err);
    }
    swiftInitializer.init(function(err, swift) {
      if (err) {
        return next(err);
      }
      swift.listContainers(function(err, ret) {
        if (err) {
          return next(err);
        }
        var containers = JSON.parse(ret.body);

        clients.forEach(function(client) {
          client.container = _.find(containers, {
            name: 'starc3_' + client.clientId
          });
        });
        res.status(200).send(clients);
      }, req);
    });
  });
};

exports.create = function(req, res, next) {
  var body = _.pick(req.body, ['clientType', 'clientId', 'name', 'domain', 'redirectUri', 'clientSecret']);
  var client = new Client(body);
  var error = client.validateSync();

  if (error) {
    next(error);
  } else {
    swiftInitializer.init(function(err, swift) {
      if (err) {
        return next(err);
      } else {
        client.container = 'starc3_' + client.clientId;
        swift.createContainer(client.container, function(err, ret) {
          swift.retrieveContainerMetadata(client.container, function(err, ret) {
            client.save(function(err, clientReturn) {
              if (err) {
                return next(err);
              } else {
                clientReturn.container = ret.body;
                return res.status(200).send(clientReturn);
              }
            });
          }, req);
        }, req);
      }
    });
  }
};

exports.read = function(req, res) {};

exports.update = function(req, res, next) {
  var client = req.client;
  var body = _.pick(req.body, ['clientType', 'name', 'domain', 'redirectUri', 'clientSecret']);

  Object.keys(body).forEach(function(key) {
    client[key] = body[key];
  });
  var error = client.validateSync();

  if (error) {
    next(error);
  } else {
    client.save(function(err, clientRet) {
      if (err) {
        next(err);
      } else {
        console.log(clientRet);
        res.status(200).send(clientRet.toObject());
      }
    });
  }
};

exports.delete = function(req, res, next) {

};

exports.clientByID = function(req, res, next, id) {
  Client.findById(id)
    .exec(function(err, client) {
      if (err) {
        return next(err);
      }
      if (!client) {
        return next({
          message: 'client specified does not exist'
        });
      }

      req.client = client;
      return next();
    });
};
