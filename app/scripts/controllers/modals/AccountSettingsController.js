class AccountSettingsController {

	constructor($modalInstance, $scope, userService) {
		this.scope = $scope;
		this.modalInstance = $modalInstance;
		this.userService = userService;
	}

	init() {
		var self = this;

		this.userService.settings()
			.then((settings) => {
				self.scope.settings = settings || {};
				self.scope.settings.ssh = self.scope.settings.ssh || {keys : []};
			});
	}

	addkeyForm() {
		delete this.scope.sshKeyFormError;
		this.scope.sshKey = {
			name: '',
			value: ''
		}
	}

	addSshKey(valid) {
		var self = this;

		if(!valid) {
			this.scope.sshKeyFormError = 'Missing Credentials';
			return;
		}

		this.userService.addSshKey(this.scope.sshKey)
			.then((result) => {
				self.scope.settings.ssh.keys
			})
			.catch((err) => {
				//TODO: broadcast global error
				console.log(err);
			})
	}

	cancelAddKey() {
		delete this.scope.sshKeyFormError;
		delete this.scope.sshKey;
	}

	close() {
		this.modalInstance.close(null);
	}

  
}
