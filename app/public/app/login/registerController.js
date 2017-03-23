Blogger.controller('registerController', ['$scope', '$http', function($scope, $http) {
    $scope.data = {};

    // Login request from frontend
    $scope.register = function() {
    	console.log('In register controller', JSON.stringify($scope.data));

    	// Verify all input fields
    	if(!$scope.data.username || !$scope.data.password || !$scope.data.repassword) {
    		return alert('All fields are required!');
    	}
    	
    	// Verify password and re-enter password
    	if($scope.data.password !== $scope.data.repassword) {
    		return alert('Password not matched!');
    	}

    	// Post request to register an admin user
    	$http.post("/admin/register", $scope.data)
      .then(function(res){
      	console.log('res: ' + JSON.stringify(res));
      }, function(res){
      	console.log('res: ' + JSON.stringify(res));
      });
    }

}]);