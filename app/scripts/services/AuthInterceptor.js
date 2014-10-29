function AuthInterceptor ($q, $injector) {
    var localService = $injector.get('localService');

    return {
        request: function(config) {
            var token;
            if (localService.get('auth_token')) {
                token = angular.fromJson(localService.get('auth_token')).token;
            }
            if (token) {
                config.headers.Authorization = 'Bearer ' + token;
            }
            return config;
        },
        responseError: function(response) {
            if (response.status === 401 || response.status === 403) {
                localService.unset('auth_token');
                $injector.get('$state').go('anon.login');
            }
            return $q.reject(response);
        }
    }   
}



// class AuthInterceptor {

//     constructor($q, $injector) {
//         this.q = $q;
//         this.injector = $injector;
//         this.localService = $injector.get('localService');
//     }

//     request(config) {
//         var token;
//         if (this.localService.get('auth_token')) {
//             token = angular.fromJson(this.localService.get('auth_token')).token;
//         }
//         if (token) {
//             config.headers.Authorization = 'HiCloud ' + token;
//         }
//         return config;
//     }

//     responseError(response) {
//         if (response.status === 401 || response.status === 403) {
//             this.localService.unset('auth_token');
//             this.injector.get('$state').go('login');
//         }
//         return this.q.reject(response);
//     }

// }

// function AuthInterceptorFactory($q, $injector) {
//     return new AuthInterceptor($q, $injector);
// }