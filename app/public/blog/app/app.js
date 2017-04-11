var BlogWebsite = angular.module('BlogWebsite', [
    'ngRoute',
    'ngTagsInput'
]);

BlogWebsite.controller('AppController', ['$scope', '$rootScope', function ($scope, $rootScope) {
  $rootScope.isLogin = true;
  // localStorage.removeItem ('isLogin')
}]);

BlogWebsite.controller('HeaderController', ['$scope', '$rootScope', function ($scope, $rootScope) {
  $rootScope.isLogin = true;
}]);

BlogWebsite.controller('FooterController', ['$scope', '$rootScope', function ($scope, $rootScope) {
  $rootScope.isLogin = true;
}]);

BlogWebsite.config(['$routeProvider', function ($routeProvider) {
	$routeProvider
  .when('/',{
    templateUrl:'app/dashboard/home.html',
    controller: 'HomeController'
  })
  .otherwise({
		redirectTo: '/login',
	});

}])
