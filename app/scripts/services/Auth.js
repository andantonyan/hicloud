class Auth {

    constructor($q, $sails, localService) {
        this.sails = $sails;
        this.localService = localService;
        this.q = $q;
    }

    isAuthenticated() {
        return this.localService.get('auth_token') ? true : false;
    }

    getUser() {
        return this.localService.get('auth_token') ? angular.fromJson(this.localService.get('auth_token')).user : {};
    }

    login(credentials) {
        var self = this,
            deferred = this.q.defer();

        this.sails.post('/api/auth/authenticate', credentials)
            .success(function (result) {
                if (result.err) {
                    return deferred.reject(new Error('error when trying login into system, ' + JSON.stringify(result.err)));
                }
                self.localService.set('auth_token', JSON.stringify(result));
                deferred.resolve(result);
            })
            .error(function(error) {
                deferred.reject(new Error('error when trying login into system' + error));
            });
        return deferred.promise;

    }

    logout() {
        this.localService.unset('auth_token');
    }

    register(formData) {
        var self = this,
            deferred = this.q.defer();

        this.sails.post('/api/auth/register', formData)
            .success(function (result) {
                if (result.err) {
                    return deferred.reject(new Error('error when trying register into system, ' + JSON.stringify(result.err)));
                }
                self.localService.set('auth_token', JSON.stringify(result));
                deferred.resolve({success: true});
            })
            .error(function(error) {
                deferred.reject(new Error('error when trying register into system' + error));
            });
        return deferred.promise;
    }
}

function AuthFactory($q, $sails, localService) {
    return new Auth($q, $sails, localService);
}
