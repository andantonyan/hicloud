var q = require('q')
  , exec = require('exec')
  , _ = require('lodash')
  , cfg = sails.config.api;

var hwApi = {
    app: {},
    user: {}
};

hwApi.app.create = function(userName, appName) {
    return execCommand(
        'app-create',
        'application has been created successfully',
        [userName, appName]
    );
};

hwApi.user.create = function(userName) {
    return execCommand(
        'user-create',
        'user has been created successfully',
        [userName]
    );
};

hwApi.user.getSshKeys = function(userName) {
    return execCommand(
        'ssh-keys-get',
        'get ssh keys',
        [userName],
        'key'
    );
};

hwApi.user.setSshKey = function(userName, sshKey) {
    return execCommand(
        'ssh-keys-set',
        'set ssh keys',
        [userName, sshKey]
    );
};

hwApi.user.deleteSshKey = function(userName, sshKey) {
    return execCommand(
        'ssh-keys-rm',
        'remove ssh keys',
        [userName, sshKey]
    );
};

//TODO: move this to helpers
var execCommand = function(command, successMsg, options, type) {
    var deferred = q.defer();
    var args = [cfg.binPath + '/' + command + '.sh', cfg.newAppDir];
    User.findOneById(options[0]).exec(function(err, user) {
        if ( err ) {
            return deferred.reject({
                status: 1,
                errno: 'NO_USER_OBJ',
                message: err.toString()
            })
        }
        options[0] = user.uname;
        args = args.concat(options);
        exec(args, function(err, out, code) {
            if ( 0 !== code ) {
                return deferred.reject({
                    status: code || 1,
                    errno: out.replace("\n", "") || err.errno,
                    message: (err.syscall && err.errno ? err.syscall + ' ' + err.errno : '')
                });
            }
            var data = {};
            if ( ! _.isUndefined(type) ) {
                switch (type) {
                    case 'key':
                        data.keys = [];
                        var keys = out.split("\n");
                        _.forEach(keys, function(key) {
                            if ( key.trim() != '' ) {
                                data.keys.push(key);
                            }
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
    });
    return deferred.promise;
};

module.exports = hwApi;