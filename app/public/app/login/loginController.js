Blogger.controller('loginController', ['$scope', 'httpService', '$location', '$rootScope', function($scope, httpService, $location, $rootScope) {
    $scope.data = {};

    $rootScope.admin = {};
    $rootScope.isLogin = false;
    
    // Login request from frontend for admin
    $scope.login = function() {
    	if(!$scope.data.username || !$scope.data.password) {
    		return alert('All fields are required!');
    	}

    	// Request login api
      httpService.post('/admin/login', $scope.data, function(res){
        if(res.success) {
          $rootScope.admin = res.res;
          localStorage.setItem ('isLogin',true)
          $rootScope.isLogin = true;
          alert('Login successful!!');
          $location.path('/posts');
        } else {
          alert(res.info);
        }
      });
    }

}]);
