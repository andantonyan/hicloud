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
		req.body.userId = req.token.uid;

		return q.when(hardwareApi.app.create(req.token.uname, req.body.name))
                .then(function(data) {
                    return q.ninvoke(App, 'create', req.body);
                })
                .then(function (app) {
                    res.json(app);
                }).catch(next)
	},
	info: function(req, res, next) {
		return q.when(q.ninvoke(App, 'findOneById', req.body.appId))
                .then(function(info) {
                    res.json(info);
                }).catch(next);
	}
};

