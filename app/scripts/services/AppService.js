class AppService {

    constructor($q, $sails) {
        this.sails = $sails;
        this.q = $q;
    }
   
    create(formData) {
        var self = this,
            deferred = this.q.defer();

        this.sails.post('/api/app/create', formData)
            .success(function (result) {
                if (result.err) {
                    return deferred.reject(new Error('error when trying create application, ' + JSON.stringify(result.err)));
                }
                deferred.resolve(result);
            })
            .error(function(error) {
                deferred.reject(new Error('error when trying create application' + error));
            });
        return deferred.promise;
    }
}

function AppServiceFactory($q, $sails) {
    return new AppService($q, $sails);
}
