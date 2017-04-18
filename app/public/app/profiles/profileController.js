Blogger.controller('profileController', ['$scope', 'httpService', '$rootScope', '$location', '$routeParams', function($scope, httpService, $rootScope, $location, $routeParams) {
    $scope.profiles     = null;
    $scope.profile      = {};
    $scope.profile.tags = [];

    // Redirect is login not found
    if(!localStorage.getItem('isLogin')){
      $location.path('/')
    }
    $rootScope.isLogin = true;
    
    // Get all profiles to display
    $scope.getProfiles = function(){
      httpService.get("/profiles", {}, function(res){
        if(res.success && !!res.res.profiles && res.res.profiles.length > 0) {
          $scope.profiles = res.res.profiles;
          $scope.profiles.reverse();
        } else {
          alert(res.info);
        }
      });
    }

    $scope.getProfiles ();

    // Get profile from URL id
    $scope.getSingleProfile = function(_id) {
      httpService.post("/profiles/getProfile", {_id: _id}, function(res){
        if(res.success) {
          $scope.profile = res.res.profile;
          $scope.profile.tags = !!$scope.profile.tags && $scope.profile.tags.length > 0 ? $scope.profile.tags : [];
        } else {
          alert(res.info);
        }
      });
    }

    if(!!$routeParams.profileId) {
      $scope.getSingleProfile($routeParams.profileId);
    }

    // Create new profiles
    $scope.new = function(){
      console.log(JSON.stringify($scope.profile))
      // Validate input keys
      if(!$scope.profile || !$scope.profile.name || !$scope.profile.username || !$scope.profile.password) {
        alert('Name, username and password are required to process!');
        return false;
      }

      $scope.profile.active = !!$scope.profile.active ? $scope.profile.active : true;

      if(!!$scope.profile._id) { //Update a profile
        httpService.post("/profiles/edit", {query: {_id: $scope.profile._id}, data: $scope.profile}, function(res){
          if(res.success) {
            // $scope.profiles = res.profiles;
            $location.path('/profiles')
            $scope.getProfiles ();
          } else {
            alert(res.info);
          }
        });
      } else { // Create new profile
        httpService.post("/profiles/new", $scope.profile, function(res){
          if(res.success) {
            $scope.profiles = res.profiles;
            $location.path('/profiles')
            $scope.getProfiles ();
          } else {
            alert(res.info);
          }
        });
      }
    }

    // Edit existing profile
    $scope.edit = function(_id){
      httpService.post("/profiles/edit/"+_id, $scope.profile, function(res){
        if(res.success) {
          $location.path('/profiles');
          $scope.getProfiles ();
        } else {
          alert(res.info);
        }
      });
    };

    // Delete existing profile
    $scope.delete = function(_id){
      var confirm = window.confirm('Are you sure want to delete?')
      if(!confirm) {
        return false;
      }
      httpService.post("/profiles/delete/", {_id: _id}, function(res){
        if(res.success) {
          $location.path('/profiles');
          $scope.getProfiles ();
        } else {
          alert(res.info);
        }
      });
    };
    
    // Inactive a profile
    $scope.inactive = function(_id){
      console.log(_id)
      httpService.post("/profiles/inactive/", {_id: _id}, function(res){
        if(res.success) {
          $location.path('/profiles');
          $scope.getProfiles ();
        } else {
          alert(res.info);
        }
      });
    };

    // Activate a profile
    $scope.active = function(_id){
      httpService.post("/profiles/active/", {_id: _id}, function(res){
        if(res.success) {
          $location.path('/profiles');
          $scope.getProfiles ();
        } else {
          alert(res.info);
        }
      });
    };

}]);