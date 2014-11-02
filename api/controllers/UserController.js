/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    create: function(req, res) {
        res.json(301, 'To create a user go to /auth/register');
    },
    settings: function(req, res, next) {
        return q.when(hardwareApi.user.getSshKeys(req.token.sid))
                .then(function(data) {
                    res.json({
                        ssh: { keys: data }
                    });
                }).catch(next);
    },
    'add-ssh-key': function(req, res, next) {
        var key = req.body.value + ' ' + req.body.name;
        return q.when(hardwareApi.user.setSshKey(req.token.sid, key))
                .then(function(data) {
                    res.json(req.body);
                }).catch(next);
    }
};
