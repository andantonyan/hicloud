//TODO: find out why authService has to be first parameter
//TODO: remove MainController extend workaround - $scope is different
//TODO: why traceur owerwrited child class constructor
class DashboardController extends MainController {
	constructor(authService, $scope, $state, $modal) {
		super(authService, $scope);
		this.scope = $scope;
		this.state = $state;
		this.modal = $modal;
	}

	init() {
		super.init();
		if(!this.scope.isAuthenticated) {
			this.state.go('home');
		}
	}

	createApplication() {
		var modalInstance = this.modal.open({
			templateUrl: '/build/views/modals/create-application.html',
			controller: 'CreateAppCtrl',
			controllerAs: 'modal'
		});

		modalInstance.result
			.then((result) => {
				//TODO: broadcast sussess
				// console.log('result from backend', result);
			})
	}

    myApplications() {
		var modalInstance = this.modal.open({
			templateUrl: '/build/views/modals/my-applications.html',
			controller: 'ShowAppsCtrl',
			controllerAs: 'modal'
		});
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
