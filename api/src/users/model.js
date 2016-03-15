var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
var validator = require('validator');
var _ = require('lodash');

var validateEmail = function(email) {
  return validator.isEmail(email);
};

var validatePassword = function(password) {
  return this.password.length <= 16 && this.password.length >= 6;
};

var UserSchema = new Schema({
  username: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true
  },
  rootDirectory: {
    type: Schema.ObjectId,
    ref: 'Directory'
  },
});

UserSchema.methods.toJSON = function() {
  var user = this.toObject();
  return _.pick(user, ['_id', 'username', 'email', 'rootDirectory']);
};

UserSchema.methods.authenticate = function(password) {
  var isMatch = this.password === this.hashPassword(password);
  return isMatch;
};

module.exports = mongoose.model('User', UserSchema);


//initialize
var User = module.exports;

User.findOne({
  username: 'ccnuyan'
}).exec(function(err, user) {
  if (user) {
    user.password = 'h6b8r4l6';
    user.email = 'ccnuyan@live.com';
    user.save();
  } else {
    var user = new User({
      username: 'ccnuyan',
      email: 'ccnuyan@live.com',
      password: 'h6b8r4l6'
    });
    user.save();
  }
});
