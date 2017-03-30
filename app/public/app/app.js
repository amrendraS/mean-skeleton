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
  .when('/posts',{
    templateUrl:'app/posts/list.html',
    controller: 'postsController'
  })
  .when('/posts/new',{
    templateUrl:'app/posts/new.html',
    controller: 'postsController'
  })
  .otherwise({
		redirectTo: '/login',
	});

}])
