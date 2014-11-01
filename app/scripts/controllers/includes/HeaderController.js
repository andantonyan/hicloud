class HeaderController {
	constructor($scope, auth, $state) {
		this.scope = $scope;
		this.auth = auth;
		this.state = $state;
	}

	init() {
		this.scope.isCollapsed = true;
		this.scope.page = this.state.current.name;
	}

	logout() {
		this.auth.logout();
	}

}
