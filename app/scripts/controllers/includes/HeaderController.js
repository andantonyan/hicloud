class HeaderController {
	constructor($scope, auth, $route) {
		this.scope = $scope;
		this.auth = auth;
		this.route = $route;

		this.scope.isAuthenticated = this.scope.$parent.isAuthenticated;
		this.scope.isCollapsed = true;
	}

	init() {
		
	}

	logout() {
		this.auth.logout();
	}

}
