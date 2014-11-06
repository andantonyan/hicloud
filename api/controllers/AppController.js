/**
 * AppController
 *
 * @description :: Server-side logic for managing Apps
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
q = require('q');

module.exports = {
	create: function(req, res, next) {
		//TODO: Add express validators
		req.body.user = req.token.uid;

		return q.when(hardwareApi.app.create(req.token.uname, req.body.name))
                .then(function(data) {
                    return q.ninvoke(App, 'create', req.body);
                })
                .then(function (app) {
                    res.json(app);
                }).catch(next)
	},

    delete: function(req, res, next) {
        var userId = req.token.uid,
            appId = req.body.appId,
            date = new Date();
        
        return q.ninvoke(App, 'findOne', {id: req.body.appId})
                .then(function (app) {
                    app.deletedAt = date.toJSON();
                    return q.ninvoke(app, 'save');
                })
                .then(function (app) {
                    appData = app;
                    return q.when(hardwareApi.app.delete(req.token.uname, app.name));
                })
                .then(function(result) {
                    res.json(result);
                })
                .catch(next)
    },

	info: function(req, res, next) {
		return q.ninvoke(App, 'findOne', {id: req.body.appId, deletedAt: null})
                .then(function(info) {
                    res.json(info);
                }).catch(next);
	}
};

