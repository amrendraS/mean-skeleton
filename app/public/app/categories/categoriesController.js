Blogger.controller('categoriesController', ['$scope', 'httpService', '$rootScope', '$routeParams', '$location', function($scope, httpService, $rootScope, $routeParams, $location) {
	
	// Get all categories from backend
	$scope.getCategories = function(){
    httpService.get("/categories", {}, function(res){
    	$scope.categories = [];
      if(res.success) {
      	if(!res.res || !res.res.category || res.res.category.length < 0) {
      		return true;
      	}
      	$scope.categories = res.res.category;
        $scope.categories.reverse();
        for (var i = 0; i < $scope.categories.length; i++) {
          $scope.categories[i].createdAt = new Date($scope.categories[i].createdAt).toLocaleString();
          $scope.categories[i].updatedAt = new Date($scope.categories[i].updatedAt).toLocaleString();
        }
      } else {
        alert(res.info);
      }
    });
  }

  // Create new or edit category
  $scope.new = function(){
    // Validate input keys
    if(!$scope.category || !$scope.category.name) {
      alert('Category name is required to process!');
      return false;
    }

    if(!!$scope.category._id) { //Update a category
      httpService.post("/categories/edit", {query: {_id: $scope.category._id}, data: $scope.category}, function(res){
        if(res.success) {
          $location.path('/categories')
        } else {
          alert(res.info);
        }
      });
    } else { // Create new category
      httpService.post("/categories/new", $scope.category, function(res){
        if(res.success) {
          $scope.category = res.category;
          $location.path('/categories');
        } else {
          alert(res.info);
        }
      });
    }
  }

  // Get category from ID
  $scope.getSingleCategory = function(_id) {
    httpService.post("/categories/getCategory", {_id: _id}, function(res){
      if(res.success) {
        $scope.category = res.res.category;
      } else {
        alert(res.info);
      }
    });
  }

  // Delete existing category
    $scope.delete = function(_id){
      var confirm = window.confirm('Are you sure want to delete?')
      if(!confirm) {
        return false;
      }
      httpService.post("/categories/delete/", {_id: _id}, function(res){
      	console.log(res)
        if(res.success) {
          $scope.getCategories();
        } else {
          alert(res.info);
        }
      });
    };

  if(!!$routeParams.categoryId) {
    $scope.getSingleCategory($routeParams.categoryId);
  } else {
	 	// Load all categories on page load
		$scope.getCategories();
  }

}]);