class HomeController {
	constructor($scope, authService, userService) {
		this.scope = $scope;
		this.authService = authService;
	}

	init() {
        this.scope.isAuthenticated = this.authService.isAuthenticated();
		this.scope.user = this.authService.getUser();
	}
  
}
