var Blogger = angular.module('Blogger', [
    'ngRoute'
]);

Blogger.config(['$routeProvider', function ($routeProvider) {
	$routeProvider
  .when('/register',{
    templateUrl:'app/login/register.html',
    controller: 'registerController'
  })
  .when('/login',{
    templateUrl:'app/login/login.html',
    controller: 'loginController'
  })
  .otherwise({
		redirectTo: '/login',
	});

}])
