BlogWebsite.controller('HomeController', ['$scope', 'httpService', function($scope, httpService) {
	// Get all posts to display
  $scope.getPosts = function(){
    httpService.get("/posts", {}, function(res){
    	console.log('POSTS: ', res);
      if(res.success) {
        $scope.posts = res.res.posts;
        $scope.posts.reverse();
        // Get categories for these posts
        $scope.getCategories(function(categories){
          for (var i = 0; i < $scope.posts.length; i++) {
            $scope.posts[i].categoriesName = [];
            $scope.posts[i].createdAt = new Date($scope.posts[i].createdAt).toLocaleString();
            $scope.posts[i].updatedAt = new Date($scope.posts[i].updatedAt).toLocaleString();

            // Add categories name for posts
            if(!!$scope.posts[i].categories && $scope.posts[i].categories.length > 0 ) {
              for (var j = 0; j < categories.length; j++) {
                for (var k = 0; k < $scope.posts[i].categories.length; k++) {
                  if($scope.posts[i].categories[k] === categories[j]._id) { // If category id matched for this post
                    $scope.posts[i].categoriesName.push(categories[j].name);
                  }
                }
              }
            } else {
              console.log('This post doesnt have categories!')
            }

          }
        });
        
      } else {
        alert(res.info);
      }
    });
  }

  // Get categories for edit and add post
  $scope.getCategories = function(cb) {
    httpService.get("/categories", {}, function(res){
      if(res.success) {
        $scope.categories = res.res.category;
        $scope.categories.reverse();
        cb($scope.categories)
      } else {
        cb(res.info);
      }
    });
  }

  // Get tags from posts
	httpService.get("/tags", {}, function(res){
    if(res.success && res.res.tags) {
    	$scope.tags = res.res.tags;
    	console.log($scope.tags)
    	$scope.tagsLength = Object.keys($scope.tags).length;
    } else {
      alert(res.info);
    }
  });

  $scope.getPosts();
}]);