class AccountSettingsController {

	constructor($modalInstance, $scope) {
		this.scope = $scope;
		this.modalInstance = $modalInstance;
	}

	init() {
		
	}

	done(valid) {
		var self = this;

		if(!valid) {
			this.scope.formError = 'Missing Credentials';
			return;
		}
	}

	close() {
		this.modalInstance.close(null);
	}

  
}
