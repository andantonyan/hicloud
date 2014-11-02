var q = require('q')
  , exec = require('exec')
  , _ = require('lodash')
  , cfg = sails.config.api;

var hwApi = {
    app: {},
    user: {}
};

hwApi.app.create = function(userId, appName) {
    return execCommand('app-create', 'application has been created successfully', [userId, appName]);
};


//TODO: move this to helpers
//TODO: add data passing capability
var execCommand = function(command, successMsg, options) {
    var deferred = q.defer();
    var args = [cfg.binPath + '/' + command + '.sh', cfg.newAppDir];
    if ( _.isArray(options) ) {
        args = args.concat(options);
    }
    exec(args, function(err, out, code) {
        if ( 0 !== code ) {
            return deferred.reject({
                status: 1,
                message: err.syscall + ' ' + err.errno
            });
        }
        return deferred.resolve({
            status: 0,
            message: successMsg
        });
    });
    return deferred.promise;
};

module.exports = hwApi;