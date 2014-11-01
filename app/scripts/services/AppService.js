class AppService {

    constructor($q, $sailsSocket) {
        this.sailsSocket = $sailsSocket;
        this.q = $q;
    }
   
    create(formData) {
        var self = this,
            deferred = this.q.defer();

        this.sailsSocket.post('/api/app/create', formData)
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

function AppServiceFactory($q, $sailsSocket) {
    return new AppService($q, $sailsSocket);
}
