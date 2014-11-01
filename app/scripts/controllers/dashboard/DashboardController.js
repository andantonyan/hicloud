class DashboardController {
	constructor($scope, $state, $modal) {
		this.scope = $scope;
		this.state = $state;
		this.modal = $modal;
	}

	init() {
		if(!this.scope.isAuthenticated) {
			$(this).state.go('home');
		}
	}

	createApplication() {
	    var modalInstance = this.modal.open({
			templateUrl: '/build/views/modals/create-application.html'
			// controller: 'ModalInstanceCtrl',
	    });

	    modalInstance.result
		    .then((result) => {

		    })
	}

	myAplications() {
		console.log('My Applications')
	}
}
