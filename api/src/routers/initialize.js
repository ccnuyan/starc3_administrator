var passport = require('passport');

module.exports = function(app) {
  app.use('/clients/',
    passport.authenticate('bearer', {
      session: false
    }),
    require('./clients.server.router'));
  app.use('/users/',
    passport.authenticate('bearer', {
      session: false
    }),
    require('./users.server.router'));
  app.use('/containers/',
    passport.authenticate('bearer', {
      session: false
    }),
    require('./containers.server.router'));
};
