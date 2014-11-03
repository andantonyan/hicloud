class RegisterController {
	constructor($state, auth, $scope) {
		this.state = $state;
		this.auth = auth;
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
		this.auth.register(this.scope.user)
			.then((user) => {
				self.state.go('home');
			})
			.catch((error)=> {
				this.scope.formError = error.toString();
			});
	}

}
