class HeaderController {
	constructor($scope, currentUser, auth) {
		this.scope = $scope;
		this.currentUser = currentUser;
		this.auth = auth;
	}

	init() {
		this.scope.isCollapsed = true;
		this.scope.user = this.currentUser.user;
	}

	logout() {
		this.auth.logout();
	}
}
