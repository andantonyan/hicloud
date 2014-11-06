class AuthService {

    constructor($q, networkService, localService) {
        this.networkService = networkService;
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

        this.networkService.post('/api/auth/authenticate', credentials)
            .success(function(result) {
                if ( result.err ) {
                    return deferred.reject(result.err);
                }
                self.localService.set('auth_token', JSON.stringify(result));
                deferred.resolve(result);
            })
            .error(function(result) {
                deferred.reject(result.err);
            });
        return deferred.promise;

    }

    logout() {
        this.localService.unset('auth_token');
    }

    register(formData) {
        var self = this,
            deferred = this.q.defer();

        this.networkService.post('/api/auth/register', formData)
            .success(function(result) {
                if ( result.err ) {
                    return deferred.reject(result.err);
                }
                self.localService.set('auth_token', JSON.stringify(result));
                deferred.resolve(result);
            })
            .error(function(result) {
                deferred.reject(result.err);
            });
        return deferred.promise;
    }
}

function AuthServiceFactory($q, networkService, localService) {
    return new AuthService($q, networkService, localService);
}
