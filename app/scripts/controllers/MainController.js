class MainController {

	constructor(authService, userService, $scope, $state, $modal) {
		this.authService = authService;
		this.userService = userService;
		this.scope = $scope;
	}

	init() {
		this.scope.isAuthenticated = this.authService.isAuthenticated();
		this.scope.user = this.authService.getUser();
	}
  
}
