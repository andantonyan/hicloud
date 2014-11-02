var q = require('q')
  , exec = require('exec')
  , _ = require('lodash')
  , cfg = sails.config.api;

var hwApi = {
    app: {},
    user: {}
};

hwApi.app.create = function(userId, appName) {
    return execCommand(
        'app-create',
        'application has been created successfully',
        [userId, appName]
    );
};

hwApi.user.getSshKeys = function(userId) {
    return execCommand(
        'ssh-keys-get',
        'get ssh keys',
        [userId],
        'key'
    );
};

hwApi.user.setSshKeys = function(userId, sshKey) {
    return execCommand(
        'ssh-keys-set',
        'set ssh keys',
        [userId, sshKey]
    );
};

//TODO: move this to helpers
//TODO: add data passing capability
var execCommand = function(command, successMsg, options, type) {
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
        var data = {};
        if ( ! _.isUndefined(type) ) {
            switch (type) {
                case 'key':
                    data.keys = [];
                    var rows = out.split("\n");
                    _.forEach(rows, function(row) {
                        var cols = row.split(" ");
                        data.keys.push([ cols[2], cols[0] + ' ' + cols[1] ]);
                    });
                    break;
                default:
            }
        }
        return deferred.resolve({
            status: 0,
            message: successMsg,
            data: data
        });
    });
    return deferred.promise;
};

module.exports = hwApi;