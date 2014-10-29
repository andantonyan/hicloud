class CurrentUser {

    constructor(localService) {
        this.localService = localService;
    }

    user() {
        if (this.localService.get('auth_token')) {
            return angular.fromJson(this.localService.get('auth_token')).user;
        } else {
            return {};
        }
    }

}

function CurrentUserFactory(localService) {
    return new CurrentUser(localService);
}