class UserService {

    constructor($q, $sailsSocket) {
        this.sailsSocket = $sailsSocket;
        this.q = $q;
    }
   
    settings() {
        var self = this,
            deferred = this.q.defer();

        this.sailsSocket.get('/api/user/settings')
            .success(function (result) {
                if (result.err) {
                    return deferred.reject(new Error('error when trying get user settings, ' + JSON.stringify(result.err)));
                }
                deferred.resolve(result);
            })
            .error(function(error) {
                deferred.reject(new Error('error when trying get user settings, ' + error));
            });
        return deferred.promise;
    }

    addSshKey(formData) {
        var self = this,
            deferred = this.q.defer();
            
        this.sailsSocket.post('/api/user/add-ssh-key', formData)
            .success(function (result) {
                if (result.err) {
                    return deferred.reject(new Error('error when trying to set ssh key, ' + JSON.stringify(result.err)));
                }
                deferred.resolve(result);
            })
            .error(function(error) {
                deferred.reject(new Error('error when trying to set ssh key, ' + error));
            });
        return deferred.promise;
    }
}

function UserServiceFactory($q, $sailsSocket) {
    return new UserService($q, $sailsSocket);
}
