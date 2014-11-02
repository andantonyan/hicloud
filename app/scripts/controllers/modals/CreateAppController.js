class CreateAppController {

	constructor($modalInstance, $scope, appService) {
		this.scope = $scope;
		this.modalInstance = $modalInstance;
		this.appService = appService;
	}

	init() {
		this.scope.app = {};
		this.scope.appTypes = [{ value: "node", text: "Node" }];
		this.scope.app.type = this.scope.appTypes[0].value;
	}

	done(valid) {
		var self = this;

		if(!valid) {
			this.scope.formError = 'Missing Credentials';
			return;
		}

		this.appService.create(this.scope.app)
			.then((result) => {
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
