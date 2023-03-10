//TODO: find out why authService has to be first parameter
//TODO: remove MainController extend workaround - $scope is different
//TODO: why traceur owerwrited child class constructor
class DashboardController {
	constructor($scope, $state, $modal, lodash, authService, userService) {
		this.scope = $scope;
		this.state = $state;
		this.modal = $modal;
		this._ = lodash;
		this.authService = authService;
		this.userService = userService;
	}

	init() {
        var self = this;

        this.scope.isAuthenticated = this.authService.isAuthenticated();
        
		if(!this.scope.isAuthenticated) {
			return this.state.go('home');
		}

		this.scope.user = this.authService.getUser();

        this.userService.myApps()
            .then((apps) => {
                self.scope.apps = apps;
            })
            .catch((err) => {
                console.log(err);
            });
	}

	createApplication() {
        var self = this;
		var modalInstance = this.modal.open({
			templateUrl: '/build/views/modals/create-application.html',
			controller: 'CreateAppCtrl',
			controllerAs: 'modal',
            resolve: {
                apps: function() { return self.scope.apps; }
            }
		});
		modalInstance.result
			.then((result) => {
				//TODO: broadcast success
				// console.log('result from backend', result);
			})
	}

	deleteApplication(appId) {
        var self = this;
		var modalInstance = this.modal.open({
			templateUrl: '/build/views/modals/delete-application.html',
			controller: 'DeleteAppCtrl',
			controllerAs: 'modal',
			size: 'sm',
            resolve: {
                appId: function() { return appId; }
            }
		});
		modalInstance.result
			.then((result) => {
				if (result) {
					self._.remove(self.scope.apps, {id: appId});
				}
			});
	}

	showApplicationInfo(appId) {
        var self = this;
		var modalInstance = this.modal.open({
			templateUrl: '/build/views/modals/app-info.html',
			controller: 'AppInfoCtrl',
			controllerAs: 'modal',
            resolve: {
                appId: function() { return appId; }
            }
		});
		modalInstance.result
			.then((result) => {
				//TODO: broadcast success
				// console.log('result from backend', result);
			})
	}

	accountSettings() {
		var modalInstance = this.modal.open({
			templateUrl: '/build/views/modals/account-settings.html',
			controller: 'AccountSettingsCtrl',
			controllerAs: 'modal'
		});

		modalInstance.result
			.then((result) => {
				//TODO: broadcast sussess
				// console.log('result from backend', result);
			})
	}
}
