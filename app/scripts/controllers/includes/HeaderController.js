class HeaderController {
	constructor($scope, $state, authService) {
		this.scope = $scope;
		this.state = $state;
		this.authService = authService;
	}

	init() {
		this.scope.isCollapsed = true;
		this.scope.page = this.state.current.name;
        this.scope.isAuthenticated = this.authService.isAuthenticated();
		this.scope.user = this.authService.getUser();
	}

	logout() {
		this.authService.logout();
		this.init();
		this.state.go('home');
	}

}
