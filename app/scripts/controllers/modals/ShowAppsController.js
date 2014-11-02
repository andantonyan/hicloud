class ShowAppsController {

	constructor($modalInstance, $scope, userService) {
		this.scope = $scope;
		this.modalInstance = $modalInstance;
		this.userService = userService;
	}

	init() {
        var self = this;
		this.userService.myApps()
			.then((apps) => {
				self.scope.apps = apps;
			})
			.catch((err) => {
				console.log(err);
			})
	}

	close() {
		this.modalInstance.close();
	}

  
}



