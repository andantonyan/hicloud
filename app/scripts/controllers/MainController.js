class MainController {
	constructor($scope, testService) {
		this.scope = $scope;
		this.testService = testService
	}
	init() {
		var self = this;
		this.testService.getData()
			.then(function (data) {
				self.scope.sails = data;
			})
			.catch(console.log)
	}
  
}
