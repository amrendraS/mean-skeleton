Blogger.controller('tagsController', ['$scope', 'httpService', '$rootScope', function($scope, httpService, $rootScope) {
	
	// Get tags from posts
	httpService.get("/tags", {}, function(res){
		console.log('res in controller: ' + JSON.stringify(res))
    if(res.success) {
    } else {
      alert(res.info);
    }
  });

}]);