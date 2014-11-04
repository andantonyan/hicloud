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
		req.body.userId = req.token.sid;

		return q.when(hardwareApi.app.create(req.body.userId, req.body.name))
                .then(function(data) {
                    return q.ninvoke(App, 'create', req.body);
                })
                .then(function (app) {
                    res.json(app);
                }).catch(next)
	}
};

