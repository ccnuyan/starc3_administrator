var fs = require('fs');
var path = require('path');
var html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf-8');
var _ = require('lodash');

var dependencies = require('./dependencies');

function Renderer(options) {
  console.log('server running in ' + process.env.NODE_ENV + ' mode');
  var apiurl = '\'/api\'';
  var adminApiUrl = '\'/admin/api\'';
  this.html = html.replace('__HOST__', apiurl)
    .replace('__ADMIN_HOST__', adminApiUrl)
    .replace('</title>', process.env.NODE_ENV + ' </title>');
}

function cssStringMaker(cssArr) {
  return _.reduce(cssArr, function(ret, item) {
    return ret + '\n<link rel="stylesheet" href="' + item + '"/>';
  }, '');
}

function scriptsStringMaker(scriptsArr) {
  return _.reduce(scriptsArr, function(ret, item) {
    return ret + '\n<script src="' + item + '"></script>';
  }, '');
}

Renderer.prototype.render = function(_path, callback, appName) {
  switch (appName) {
    case 'main':
      this.html = this.html.replace('__STYLES__', cssStringMaker(dependencies.main.styles));
      this.html = this.html.replace('__SCRIPTS__', scriptsStringMaker(dependencies.main.scripts));
      break;
  }
  callback(null, this.html);
};

module.exports = Renderer;
