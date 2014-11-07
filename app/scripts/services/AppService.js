class AppService {

    constructor($q, networkService) {
        this.networkService = networkService;
        this.q = $q;
    }
   
    create(formData) {
        var self = this,
            deferred = this.q.defer();

         this.networkService.post('/api/app/create', formData)
            .success(function (result) {
                if (result.err) {
                    return deferred.reject(new Error('error when trying create application, ' + JSON.stringify(result.err)));
                }
                deferred.resolve(result);
            })
            .error(function(error) {
                deferred.reject(new Error('error when trying create application, ' + JSON.stringify(error)));
            });
        return deferred.promise;
    }

    delete(appId) {
        var self = this,
            deferred = this.q.defer();

        this.networkService.post('/api/app/delete', {appId: appId})
            .success(function (result) {
                if (result.err) {
                    return deferred.reject(new Error('error when trying delete application, ' + JSON.stringify(result.err)));
                }
                deferred.resolve(result);
            })
            .error(function(error) {
                deferred.reject(new Error('error when trying delete application, ' + JSON.stringify(error)));
            });
        return deferred.promise;
    }

    info(appId) {
        var self = this,
            deferred = this.q.defer();

        this.networkService.post('/api/app/info', { appId: appId })
            .success(function (result) {
                if (result.err) {
                    return deferred.reject(new Error('error when trying create application, ' + JSON.stringify(result.err)));
                }
                deferred.resolve(result);
            })
            .error(function(error) {
                deferred.reject(new Error('error when trying create application, ' + JSON.stringify(error)));
            });
        return deferred.promise;
    }

}

function AppServiceFactory($q, networkService) {
    return new AppService($q, networkService);
}
