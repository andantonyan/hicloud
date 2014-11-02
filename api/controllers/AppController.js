/**
 * AppController
 *
 * @description :: Server-side logic for managing Apps
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	create: function(req, res, next) {
		//TODO: Add express validators
		console.log('userId', req.token.sid);
		console.log('body', req.body);
		res.json({status: true})
	}
};

