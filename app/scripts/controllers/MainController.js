class MainController {

	constructor(auth, localService, $scope) {
		this.auth = auth;
		this.localService = localService;
		this.scope = $scope; 

		this.scope.isAuthenticated = this.auth.isAuthenticated() || false;
		this.scope.user = this.localService.get('auth_token') ? angular.fromJson(this.ocalService.get('auth_token')).user : {};
	}

	init() {

	}
  
}
