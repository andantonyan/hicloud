class TestService {

    constructor($q, $sails) {
        this.q = $q;
        this.sails = $sails
    }

    getData() {
        var deferred = this.q.defer();

        this.sails.get('/test')
            .success(function (data) {
                deferred.resolve(data)
            })
            .error(function(error) {
                deferred.reject(new Error('error when trying to get data: ' + error));
            });
        return deferred.promise;
    }
}

var testService = function ($q, $sails) {
    return new TestService($q, $sails);
};
