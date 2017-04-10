Blogger.controller('tagsController', ['$scope', 'httpService', '$rootScope', function($scope, httpService, $rootScope) {
	
	$scope.tags = null;
	
	// Get tags from posts
	httpService.get("/tags", {}, function(res){
    if(res.success && res.res.tags) {
    	$scope.tags = res.res.tags;
    } else {
      alert(res.info);
    }
  });

}]);