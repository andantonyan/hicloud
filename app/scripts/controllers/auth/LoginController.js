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
			this.scope.formError = 'Please fill in all the required fields';
			return;
		}
		this.authService.login(this.scope.user)
			.then((result) => {
				self.state.go('dashboard');
			})
			.catch((error) => {
				this.scope.formError = error.message;
			});
	}

}
