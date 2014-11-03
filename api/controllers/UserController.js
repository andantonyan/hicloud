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
                .then(function(result) {
                    res.json({
                        ssh: { keys: result.data.keys }
                    });
                }).catch(next);
    },
    'add-ssh-key': function(req, res, next) {
        var key = req.body.value + ' ' + req.body.name;
        return q.when(hardwareApi.user.setSshKey(req.token.sid, key))
                .then(function(data) {
                    res.json(req.body);
                }).catch(next);
    },
    'delete-ssh-key': function(req, res, next) {
        var keySpl = req.body.key.split(' ');
        var key = keySpl.pop();
        var value = keySpl.join(' ');
        return q.when(hardwareApi.user.deleteSshKey(req.token.sid, value + ' ' + key))
                .then(function(data) {
                    res.json({ name: key, value: value });
                }).catch(next);
    },
    apps: function(req, res, next) {
        return q.when(App.find({ userId: req.token.sid }))
                .then(function(apps) {
                    res.json(apps);
                }).catch(next);
    }
};
