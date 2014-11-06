class DeleteAppController {

	constructor($modalInstance, $scope, appService, appId) {
		this.scope = $scope;
		this.modalInstance = $modalInstance;
		this.appService = appService;
		this.scope.appId = appId;
	}

	init() {

	}

	done() {
		var self = this;
		
		this.appService.delete(this.scope.appId)
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
