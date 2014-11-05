class CreateAppController {

	constructor($modalInstance, $scope, appService, apps) {
		this.scope = $scope;
		this.modalInstance = $modalInstance;
		this.appService = appService;
		this.scope.apps = apps;
	}

	init() {
		this.scope.app = {};
		this.scope.appTypes = [{ value: "node", text: "Node" }];
		this.scope.app.type = this.scope.appTypes[0].value;
	}

	done(valid) {
		var self = this;

		if(!valid) {
			this.scope.formError = 'Please fill in all the required fields';
			return;
		}

		this.appService.create(this.scope.app)
			.then((result) => {
                self.scope.apps.push(result);
				self.modalInstance.close(result);
			})
			.catch((err) => {
				console.log(err);
			})
	}

	close() {
		this.modalInstance.close();
	}

  
}
