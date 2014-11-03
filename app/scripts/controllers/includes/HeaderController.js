class HeaderController {
	constructor($scope, authService, $state) {
		this.scope = $scope;
		this.authService = authService;
		this.state = $state;
	}

	init() {
		this.scope.isCollapsed = true;
		this.scope.page = this.state.current.name;
	}

	logout() {
		this.authService.logout();
	}

}
