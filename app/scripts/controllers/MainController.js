class MainController {

	constructor(auth, $scope) {
		this.auth = auth;
		this.scope = $scope; 

	}

	init() {
		this.scope.isAuthenticated = this.auth.isAuthenticated();
		this.scope.user = this.auth.getUser();
	}
  
}
