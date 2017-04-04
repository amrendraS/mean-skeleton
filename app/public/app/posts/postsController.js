Blogger.controller('postsController', ['$scope', 'httpService', '$rootScope', '$location', '$routeParams', function($scope, httpService, $rootScope, $location, $routeParams) {
    $scope.posts = null;
    $scope.post  = null;

    // Redirect is login not found
    if(!localStorage.getItem('isLogin')){
      $location.path('/')
    }
    $rootScope.isLogin = true;
    
    // Get all posts to display
    $scope.getPosts = function(){
      httpService.get("/posts", {}, function(res){
        if(res.success) {
          $scope.posts = res.res.posts;
          $scope.posts.reverse();
        } else {
          alert(res.info);
        }
      });
    }

    $scope.getPosts ();

    // Get post from URL id
    $scope.getSinglePost = function(_id) {
      httpService.post("/posts/getPost", {_id: _id}, function(res){
        if(res.success) {
          $scope.post = res.res.post;
        } else {
          alert(res.info);
        }
      });
    }

    if(!!$routeParams.postId) {
      $scope.getSinglePost($routeParams.postId)
    }

    // Create new posts
    $scope.new = function(){
      // Validate input keys
      if(!$scope.post || !$scope.post.title || !$scope.post.description) {
        alert('Title and Description is required to process!');
        return false;
      }

      // TODO: Replace this with local storage
      if(!!$scope.post.author || (!!$rootScope.admin && !!$rootScope.admin._id)) {
        $scope.post.author = !!$scope.post.author ? $scope.post.author : $rootScope.admin._id;
      } else {
        $scope.post.author = "amrendra";
      }
      $scope.post.active = !!$scope.post.active ? $scope.post.active : true;

      if(!!$scope.post._id) { //Update a post
        httpService.post("/posts/edit", {query: {_id: $scope.post._id}, data: $scope.post}, function(res){
          if(res.success) {
            // $scope.posts = res.posts;
            $location.path('/posts')
            $scope.getPosts ();
          } else {
            alert(res.info);
          }
        });
      } else { // Create new post
        httpService.post("/posts/new", $scope.post, function(res){
          if(res.success) {
            $scope.posts = res.posts;
            $location.path('/posts')
            $scope.getPosts ();
          } else {
            alert(res.info);
          }
        });
      }
    }

    // Edit existing post
    $scope.edit = function(_id){
      httpService.post("/posts/edit/"+_id, $scope.post, function(res){
        if(res.success) {
          $scope.getPosts ();
        } else {
          alert(res.info);
        }
      });
    };

    // Delete existing post
    $scope.delete = function(_id){
      httpService.post("/posts/delete/", {_id: _id}, function(res){
        if(res.success) {
          $scope.getPosts ();
        } else {
          alert(res.info);
        }
      });
    };
    
    // Inactive a post
    $scope.inactive = function(_id){
      httpService.post("/posts/inactive/", {_id: _id}, function(res){
        if(res.success) {
          $scope.getPosts ();
        } else {
          alert(res.info);
        }
      });
    };

    // Activate a post
    $scope.active = function(_id){
      httpService.post("/posts/active/", {_id: _id}, function(res){
        if(res.success) {
          $scope.getPosts ();
        } else {
          alert(res.info);
        }
      });
    };

}]);
