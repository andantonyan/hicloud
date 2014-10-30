class LocalService {

    constructor() {
    }

    get(key) {
        return localStorage.getItem(key);
    }

    set(key, val) {
        return localStorage.setItem(key, val);
    }

    unset(key) {
        return localStorage.removeItem(key);
    }
}

function LocalServiceFactory($q, $injector) {
    return new LocalService($q, $injector);
}
