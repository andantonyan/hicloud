class UserService {

    constructor($q, networkService) {
        this.networkService = networkService;
        this.q = $q;
    }
   
    settings() {
        var self = this,
            deferred = this.q.defer();

        this.networkService.get('/api/user/settings')
            .success(function (result) {
                if (result.err) {
                    return deferred.reject(new Error('error when trying get user settings, ' + JSON.stringify(result.err)));
                }
                deferred.resolve(result);
            })
            .error(function(error) {
                deferred.reject(new Error('error when trying get user settings, ' + JSON.stringify(error)));
            });
        return deferred.promise;
    }

    addSshKey(key) {
        var self = this,
            deferred = this.q.defer();
            
        this.networkService.post('/api/user/add-ssh-key', { key: key })
            .success(function (result) {
                if (result.err) {
                    return deferred.reject(new Error('error when trying to set ssh key, ' + JSON.stringify(result.err)));
                }
                deferred.resolve(result);
            })
            .error(function(error) {
                deferred.reject(new Error('error when trying to set ssh key, ' + JSON.stringify(error)));
            });
        return deferred.promise;
    }

    removeSshKey(value) {
        var self = this,
            deferred = this.q.defer();

        this.networkService.post('/api/user/delete-ssh-key', { key: value })
            .success(function(result) {
                if (result.err) {
                    return deferred.reject(new Error('error when trying to delete ssh key, ' + JSON.stringify(result.err)));
                }
                deferred.resolve(result);
            })
            .error(function(error) {
                deferred.reject(new Error('error when trying to delete ssh key, ' + JSON.stringify(error)));
            });
        return deferred.promise;
    }

    myApps() {
        var self = this,
            deferred = this.q.defer();

        this.networkService.get('/api/user/apps')
            .success(function (result) {
                if (result.err) {
                    return deferred.reject(new Error('error when trying list user applications, ' + JSON.stringify(result.err)));
                }
                deferred.resolve(result);
            })
            .error(function(error) {
                deferred.reject(new Error('error when trying list user applications, ' + error));
            });
        return deferred.promise;
    }

}

function UserServiceFactory($q, networkService) {
    return new UserService($q, networkService);
}
