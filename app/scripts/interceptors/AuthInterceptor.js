function AuthInterceptor ($q, $injector) {
    var localService = $injector.get('localService');

    return {
        request: function(config) {
            var token;
            if (localService.get('auth_token')) {
                token = angular.fromJson(localService.get('auth_token')).token;
            }
            if (token) {
                config.headers.Authorization = 'HiToken ' + token;
            }
            return config;
        },
        responseError: function(response) {
            if (response.status === 401 || response.status === 403) {
                localService.unset('auth_token');
                $injector.get('$state').go('login');
            }
            return $q.reject(response);
        }
    }   
}
