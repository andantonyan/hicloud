class LoginController {
	constructor($scope, $state, authService) {
		this.scope = $scope;
		this.authService = authService;
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
		this.authService.login(this.scope.user)
			.then((result) => {
				self.state.go('home');
			})
			.catch((error)=> {
				this.scope.formError = error.toString();
			});
	}

}
