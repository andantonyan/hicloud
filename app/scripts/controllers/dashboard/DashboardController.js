//TODO: find out why auth has to be first parameter
//TODO: remove MainController extend workaround - $scope is different
//TODO: why traceur owerwrited child class constructor
class DashboardController extends MainController {
	constructor(auth, $scope, $state, $modal) {
		super(auth, $scope);
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

	applications() {
		console.log('My Applications')
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
