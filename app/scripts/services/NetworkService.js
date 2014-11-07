class NetworkService {

    constructor($sailsSocket, $http, serviceCallsType) {

        switch (serviceCallsType) {
            case '$sailsSocket':
                return $sailsSocket;
            case '$http':
                return $http;
            default:
                return {};
        }

    }

}

function NetworkServiceFactory($sailsSocket, $http, serviceCallsType) {
    return new NetworkService($sailsSocket, $http, serviceCallsType);
}
