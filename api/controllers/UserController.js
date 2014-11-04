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
        return q.when(hardwareApi.user.getSshKeys(req.token.uid))
                .then(function(result) {
                    res.json({
                        ssh: { keys: result.data.keys }
                    });
                }).catch(next);
    },
    'add-ssh-key': function(req, res, next) {
        var key = req.body.key;
        return q.when(hardwareApi.user.setSshKey(req.token.uid, key))
                .then(function(data) {
                    res.json(req.body);
                }).catch(next);
    },
    'delete-ssh-key': function(req, res, next) {
        var key = req.body.key;
        return q.when(hardwareApi.user.deleteSshKey(req.token.uid, key))
                .then(function(data) {
                    res.json({ key: key });
                }).catch(next);
    },
    apps: function(req, res, next) {
        return q.when(App.find({ userId: req.token.uid }))
                .then(function(apps) {
                    res.json(apps);
                }).catch(next);
    }
};
