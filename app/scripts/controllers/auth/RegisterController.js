class RegisterController {
	constructor($state, authService, $scope) {
		this.state = $state;
		this.authService = authService;
		this.scope = $scope;
	}

	init() {
		this.scope.user = {};		
	}

	register(valid) {
		var self = this;

		if(!valid) {
			this.scope.formError = 'Please fill in all the required fields';
			return;
		}
		this.authService.register(this.scope.user)
			.then((user) => {
				self.state.go('dashboard');
			})
			.catch((error) => {
				this.scope.formError = error;
			});
	}

}
