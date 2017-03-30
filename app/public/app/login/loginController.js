Blogger.controller('loginController', ['$scope', 'httpService', function($scope, httpService) {
    $scope.data = {};

    // Login request from frontend for admin
    $scope.login = function() {
    	if(!$scope.data.username || !$scope.data.password) {
    		return alert('All fields are required!');
    	}

    	// Request login api
      httpService.post('/admin/login', $scope.data, function(res){
        if(res.success) {
          alert('Login successful!!');
        } else {
          alert(res.info);
        }
      });
    }

}]);
