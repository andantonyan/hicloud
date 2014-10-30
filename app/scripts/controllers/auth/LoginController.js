class LoginController {
	constructor($scope, $state, auth) {
		this.scope = $scope;
		this.auth = auth;
		this.state = $state;
	}

	init() {
		this.scope.user = {};		
	}

	login(valid) {
		var self = this;

		if(!valid) {
			this.scope.formError = 'Missing Credentials';
			return;
		}
		this.auth.login(this.scope.user)
			.then((result) => {
				self.state.go('home');
			})
			.catch((error)=> {
				this.scope.formError = error.toString();
			});
	}

}
