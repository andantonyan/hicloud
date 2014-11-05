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
      return res.json(401, { err: 'username and password required' });
    }

    User.findOneByUname(uname, function(err, user) {
      if ( ! user ) {
        return res.json(401, { err: 'invalid username or password' });
      }

      User.validPassword(password, user, function(err, valid) {
        if (err) {
          return res.json(403, { err: 'forbidden' });
        }

        if (!valid) {
          res.json(401, { err: 'invalid username or password' });
        } else {
          res.json({ user: user, token: sailsTokenAuth.issueToken({uid: user.id, uname: user.uname}) });
        }
      });
    });

  },

  register: function(req, res) {

    if ( req.body.password !== req.body.confirmPassword ) {
      return res.json({ err: 'Passwords do not match' });
    }

    if ( -1 !== cfg.disallowedUsernames.indexOf(req.body.uname) ) {
      return res.json({ err: 'This username is not allowed' });
    }

    q.when(hardwareApi.user.check(req.body.uname))
     .then(function() {
       return q.ninvoke(User, 'create', req.body);
     })
     .then(function(user) {
        return q.when(hardwareApi.user.create(user.uname))
                .then(function(result) {
                    res.json({ user: user, token: sailsTokenAuth.issueToken({uid: user.id, uname: user.uname}) });
                }).catch(function(result) {
                    res.json({ err: result.message.length ? result.message : result.errno });
                });
     }).catch(function(result) {
        //TODO Write our error system (see eventconsort :))
        var err = 'Unknown error';
        if ( result.errno == 'SYS_USER_EXISTS' ) {
            err = 'This username already exists or cannot be used';
        } else if ( result.message && result.message.length ) {
            err = result.message;
        } else if ( result.toJSON ) {
            if ( result.toJSON().error == 'E_VALIDATION' ) {
                err = 'Form filled in incorrect or such user already exists';
            }
        }
        res.json({ err: err });
     });

  }

};