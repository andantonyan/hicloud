class Auth {

    constructor($http, localService, accessLevels) {
        this.http = $http;
        this.localService = localService;
        this.accessLevels = accessLevels;
    }

    authorize(access) {
        if (access === accessLevels.user) {
            return this.isAuthenticated();
        } else {
            return true;
        }
    }

    isAuthenticated() {
        return this.localService.get('auth_token');
    }

    login(credentials) {
        var login = this.http.post('/auth/authenticate', credentials);
            login.success(function(result) {
                this.localService.set('auth_token', JSON.stringify(result));
            });
        return login;
    }

    logout() {
        this.localService.unset('auth_token');
    }

    register(formData) {
        this.localService.unset('auth_token');
        var register = this.http.post('/auth/register', formData);
        register.success(function(result) {
            this.localService.set('auth_token', JSON.stringify(result));
        });
        return register;
    }
}

function AuthFactory($http, localService, accessLevels) {
    return new Auth($http, localService, accessLevels);
}