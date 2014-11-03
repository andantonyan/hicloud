class MainController {

	constructor(authService, $scope, $state, $modal) {
		this.authService = authService;
		this.scope = $scope; 
	}

	init() {
		this.scope.isAuthenticated = this.authService.isAuthenticated();
		this.scope.user = this.authService.getUser();
	}
  
}
