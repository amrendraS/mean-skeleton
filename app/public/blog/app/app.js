var BlogWebsite = angular.module('BlogWebsite', [
    'ngRoute',
    'ngTagsInput'
]);

// BlogWebsite.controller('BlogAppController', ['$scope', '$rootScope', function ($scope, $rootScope) {
//   $rootScope.isLogin = true;
//   // localStorage.removeItem ('isLogin')
// }]);

// BlogWebsite.controller('HeaderController', ['$scope', '$rootScope', function ($scope, $rootScope) {
//   $rootScope.isLogin = true;
// }]);

// BlogWebsite.controller('HomeController', ['$scope', '$rootScope', function ($scope, $rootScope) {
//   $rootScope.isLogin = true;
// }]);

BlogWebsite.config(['$routeProvider', function ($routeProvider) {
	$routeProvider
  .when('/',{
    templateUrl:'app/home/home.html',
    controller: 'HomeController'
  })
  .otherwise({
		redirectTo: '/',
	});

}])
