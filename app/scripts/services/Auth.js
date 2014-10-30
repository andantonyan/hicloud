class Auth {

    constructor($q, $sails, localService) {
        this.sails = $sails;
        this.localService = localService;
        this.q = $q;
    }

    isAuthenticated() {
        return this.localService.get('auth_token');
    }

    login(credentials) {
        var self = this,
            deferred = this.q.defer();

        this.sails.post('/api/auth/authenticate', credentials)
            .success(function (result) {
                self.localService.set('auth_token', JSON.stringify(result));
                deferred.resolve({success: true});
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
