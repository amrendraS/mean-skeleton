Blogger.controller('loginController', ['$scope', function($scope) {
    $scope.data = {};

    // Login request from frontend
    $scope.login = function() {
    	console.log('In login controller');
    }

}]);
