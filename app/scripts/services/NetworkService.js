class NetworkService {

    constructor($sailsSocket, $http, serviceCallsType) {

        switch (serviceCallsType) {
            case '$sailsSocket':
                return $sailsSocket;
                break;
            case '$http':
                return $http;
                break;
            default:
                return {};
                break;
        }

    }

}

function NetworkServiceFactory($sailsSocket, $http, serviceCallsType) {
    return new NetworkService($sailsSocket, $http, serviceCallsType);
}
