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
			this.scope.formError = 'Missing Credentials';
			return;
		}
		this.authService.register(this.scope.user)
			.then((user) => {
				self.state.go('home');
			})
			.catch((error)=> {
				this.scope.formError = error.toString();
			});
	}

}
