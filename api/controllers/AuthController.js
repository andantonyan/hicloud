/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

//TODO Write with Q

var cfg = sails.config.auth;

module.exports = {

  authenticate: function(req, res) {

    var uname = req.param('uname');
    var email = req.param('email');
    var password = req.param('password');

    if ( ! uname || ! password ) {
      return res.json(401, {err: 'username and password required'});
    }

    User.findOneByUname(uname, function(err, user) {
      if ( ! user ) {
        return res.json(401, {err: 'invalid username or password'});
      }

      User.validPassword(password, user, function(err, valid) {
        if (err) {
          return res.json(403, {err: 'forbidden'});
        }

        if (!valid) {
          res.json(401, {err: 'invalid username or password'});
        } else {
          res.json({ user: user, token: sailsTokenAuth.issueToken({sid: user.id}) });
        }
      });
    });

  },

  register: function(req, res) {

    if (req.body.password !== req.body.confirmPassword) {
      return res.json(401, {err: 'Password doesn\'t match'});
    }

    if ( -1 !== cfg.disallowedUsernames.indexOf(req.body.uname) ) {
      return res.json(401, {err: 'This username is not allowed'});
    }

    User.create({
        uname: req.body.uname,
        email: req.body.email,
        password: req.body.password
    }).exec(function(err, user) {
      if (err) {
        //TODO Write our error system (see eventconsort :))
        return res.json(err.status, {err: err});
      }
      if (user) {
        q.when(hardwareApi.user.create(user.id))
         .then(function(result) {
           res.json({ user: user, token: sailsTokenAuth.issueToken({sid: user.id}) });
         }).catch(console.log);
      }
    });

  }

};