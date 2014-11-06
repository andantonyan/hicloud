class AccountSettingsController {

	constructor($modalInstance, $scope, userService, lodash) {
		this.scope = $scope;
		this.modalInstance = $modalInstance;
		this.userService = userService;
		this._ = lodash;
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
        this.scope.showSshKeyField = true
		this.scope.sshKey = ''
	}

	addSshKey(valid) {
		var self = this;

		if(!valid || 3 !== self.scope.sshKey.trim().split(' ').length) {
			this.scope.sshKeyFormError = 'Please fill in all the required fields';
			return;
		}

		this.userService.addSshKey(this.scope.sshKey)
			.then((result) => {
				self.scope.settings.ssh.keys.push(result.key);
				delete self.scope.showSshKeyField;
				delete self.scope.sshKey;
				delete self.scope.sshKeyFormError;
			})
			.catch((err) => {
				//TODO: broadcast global error
				console.log(err);
			})
	}

	cancelAddKey() {
		delete this.scope.sshKey;
		delete this.scope.showSshKeyField;
        delete this.scope.sshKeyFormError;
    }

	removeSshKey(key) {
        var self = this;
		this.userService.removeSshKey(key)
			.then((result) => {
                if ( typeof result !== 'object' ) return;
                self.scope.settings.ssh.keys.forEach(function(key, i) {
                    if ( key == result.key  ) {
                        self.scope.settings.ssh.keys.splice(i, 1);
                    }
                });
			}).catch(console.log)
	}

	close() {
		this.modalInstance.close();
	}

  
}
