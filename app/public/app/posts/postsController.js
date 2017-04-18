Blogger.controller('postsController', ['$scope', 'httpService', '$rootScope', '$location', '$routeParams', function($scope, httpService, $rootScope, $location, $routeParams) {
    $scope.posts          = null;
    $scope.post           = {};
    $scope.post.tags      = [];
    // $scope.categoriesName = [];

    // Redirect is login not found
    if(!localStorage.getItem('isLogin')){
      $location.path('/')
    }
    $rootScope.isLogin = true;
    
    // Get all posts to display
    $scope.getPosts = function(){
      httpService.get("/posts", {}, function(res){
        if(res.success && !!res.res.posts && res.res.posts.length > 0) {
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

    $scope.getPosts ();

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

    $scope.getCategories(function(categories) {});

    // Get post from URL id
    $scope.getSinglePost = function(_id) {
      httpService.post("/posts/getPost", {_id: _id}, function(res){
        if(res.success) {
          $scope.post = res.res.post;
          $scope.post.tags = !!$scope.post.tags && $scope.post.tags.length > 0 ? $scope.post.tags : [];
        } else {
          alert(res.info);
        }
      });
    }

    if(!!$routeParams.postId) {
      $scope.getSinglePost($routeParams.postId);
    }

    // Create new posts
    $scope.new = function(){
      console.log(JSON.stringify($scope.post))
      // Validate input keys
      if(!$scope.post || !$scope.post.title || !$scope.post.description || (!!$scope.post.tags && $scope.post.tags.length <= 0) || (!!$scope.post.categories && $scope.post.categories.length <= 0)) {
        alert('Title, description, tags and categories are required to process!');
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
            $location.path('/posts');
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
          $location.path('/posts');
          $scope.getPosts ();
        } else {
          alert(res.info);
        }
      });
    };

    // Delete existing post
    $scope.delete = function(_id){
      var confirm = window.confirm('Are you sure want to delete?')
      if(!confirm) {
        return false;
      }
      httpService.post("/posts/delete/", {_id: _id}, function(res){
        if(res.success) {
          $location.path('/posts');
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
          $location.path('/posts');
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
          $location.path('/posts');
          $scope.getPosts ();
        } else {
          alert(res.info);
        }
      });
    };

}]);