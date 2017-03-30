Blogger.controller('postsController', ['$scope', 'httpService', function($scope, httpService) {
    $scope.posts = null;
    $scope.post  = null;

    // Get all posts to display
    $scope.getPosts = function(){
      httpService.get("/posts", {}, function(res){
        if(res.success) {
          $scope.posts = res.res.posts;
        } else {
          alert(res.info);
        }
      });
    }

    $scope.getPosts ();

    // Create new posts
    $scope.new = function(){
      // Validate input keys
      if(!$scope.post || !$scope.post.title || $scope.post.description) {
        alert('Title and Description is required!')
      }

      httpService.post("/posts/new", $scope.post, function(res){
        if(res.success) {
          $scope.posts = res.posts;
        } else {
          alert(res.info);
        }
      });
    }

}]);
