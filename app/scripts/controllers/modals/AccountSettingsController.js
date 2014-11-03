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
				self.scope.settings = settings;
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
				self.scope.settings.ssh.keys.push(result);
				delete self.scope.sshKey;
				delete this.scope.sshKeyFormError;
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

	removeSshKey(key) {
        var self = this;
		this.userService.removeSshKey(key)
			.then((result) => {
                if ( typeof result !== 'object' ) return;
                self.scope.settings.ssh.keys.forEach(function(key, i) {
                    if ( key.name == result.name && key.value == result.value ) {
                        self.scope.settings.ssh.keys.splice(i, 1);
                    }
                });
			}).catch(console.log)
	}

	close() {
		this.modalInstance.close();
	}

  
}
