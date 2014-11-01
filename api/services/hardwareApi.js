var q = require('q')
  , exec = require('exec')
  , _ = require('lodash')
  , cfg = sails.config.api;

var hwApi = {
    app: {}
};

hwApi.app.create = function(userId, appName) {
    var deferred = q.defer();
    execCommand(deferred, 'app-create', 'application has been created successfully', [userId, appName]);
    return deferred.promise;
};

var execCommand = function(deferred, successMsg, command, options) {
    var args = [cfg.binPath + '/' + command + '.sh', cfg.newAppDir];
    if ( _.isArray(options) ) {
        args = args.concat(options);
    }
    exec(args, function(err, out, code) {
        if (0 !== code) {
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
};

module.exports = hwApi;