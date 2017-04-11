var Blogger = angular.module('Blogger', [
    'ngRoute',
    'ngTagsInput'
]);

Blogger.controller('AppController', ['$scope', '$rootScope', function ($scope, $rootScope) {
  $rootScope.isLogin = true;
  // localStorage.removeItem ('isLogin')
}]);

Blogger.controller('HeaderController', ['$scope', '$rootScope', function ($scope, $rootScope) {
  $rootScope.isLogin = true;
}]);

Blogger.controller('FooterController', ['$scope', '$rootScope', function ($scope, $rootScope) {
  $rootScope.isLogin = true;
}]);

Blogger.config(['$routeProvider', function ($routeProvider) {
	$routeProvider
  .when('/',{
    templateUrl:'app/dashboard/home.html',
    controller: 'HomeController'
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
  .when('/posts/edit/:postId',{
    templateUrl:'app/posts/edit.html',
    controller: 'postsController'
  })
  .when('/categories',{
    templateUrl:'app/categories/list.html',
    controller: 'categoriesController'
  })
  .when('/categories/new',{
    templateUrl:'app/categories/new.html',
    controller: 'categoriesController'
  })
  .when('/categories/edit/:categoryId',{
    templateUrl:'app/categories/edit.html',
    controller: 'categoriesController'
  })
  .when('/tags',{
    templateUrl:'app/tags/list.html',
    controller: 'tagsController'
  })
  .when('/blog',{
    templateUrl:'app/blog/index.html',
    controller: 'blogController'
  })
  .otherwise({
		redirectTo: '/login',
	});

}])
