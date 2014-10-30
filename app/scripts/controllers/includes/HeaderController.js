class HeaderController {
	constructor($scope, auth) {
		this.scope = $scope;
		this.auth = auth;

		this.logout = this.auth.logout;
				
		this.scope.isAuthenticated = this.scope.$parent.isAuthenticated;
		this.scope.isCollapsed = true;
	}

	init() {
		
	}

}
