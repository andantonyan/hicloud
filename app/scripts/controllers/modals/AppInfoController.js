class AppInfoController {

	constructor($modalInstance, $scope, appService, authService, userService, appId) {
		this.scope = $scope;
		this.modalInstance = $modalInstance;
		this.authService = authService;
		this.appService = appService;
		this.userService = userService;
		this.appId = appId;
	}

	init() {
		var self = this;
		this.appService.info(this.appId)
			.then((info) => {
                self.scope.user = self.authService.getUser();
				self.scope.protocol = window.location.protocol;
				self.scope.host = window.location.hostname;
				self.scope.info = info;
			});
	}

	close() {
		this.modalInstance.close();
	}

  
}
