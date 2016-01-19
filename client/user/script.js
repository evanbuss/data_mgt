var limsApp = angular.module('limsApp', ['LocalStorageModule','ngRoute']);

// ---------------------------
// User Factory
// ---------------------------
limsApp.factory('UserFactory', function($http, $window) {
	var factory = {};
	var users = [];
	factory.getUsers = function(callback) {
		$http.get('/users').success(function(output) {
	        users = output;
	        // console.log('UserFactory getUsers() gave', output);
	        callback(output);
		});
    };
    factory.addUser = function(info, callback) {
    	$http.post('/users',info).success(function(output) {
	        callback();
	    }).error(function(reason){
	    	console.log("Error:" + reason);
	    	callback("error", reason);
	    });
	};
	factory.login = function(info, callback) {
	    $http.post('/login',info).success(function(output) {
	    	$window.location.href = output;
	    });
	}
	factory.requestPassword = function(email, callback){
		$http.post('/password/request',{email: email}).success(callback);
	}
	factory.resetPassword = function(user, password, callback){
		user.password = password;
		$http.post('/password/reset/complete', user).success(callback);
	}
	return factory;
});




// #########################
// Storage Controller
// #########################
limsApp.controller('StorageController', function($scope, $window, $http, localStorageService){
    $scope.local_user = localStorageService.get('local_user');
    // console.log('local user', $scope.local_user);
    getUser = function() {
	    $http.get('/check-login').success(function(output) {
	    	$scope.current_user = output;
		    // console.log("current user", $scope.current_user);
	    });
    };
    getUser();

    setTimeout(function() {
	    if($scope.current_user == undefined) {
	    	console.log("redirecting... ")
	    	$window.location.href = '/';
	    } else {
	    	console.log("success !!");
	    }
	 }, 100);

});

// #########################
// User Controller
// #########################
limsApp.controller('UserController', function($scope, $window, UserFactory, $routeParams, localStorageService) {
	UserFactory.getUsers(function(data) {
		$scope.users = data;

		for(var user in $scope.users){
			if($scope.users[user]._id === $routeParams.id){
				$scope.currentUser = $scope.users[user];
				break;
			}
		}
		// console.log('array of user objects', $scope.users);
	});

	$scope.register_processing = false;

	$scope.addUser = function() {

		$scope.register_processing = true;
	    // using Moment.js to format date
	    $scope.new_user.created_at = moment().format('MM/DD/YYYY');
	    //console.log("right here",$scope.new_user);
	    UserFactory.addUser($scope.new_user, function(err, result) {
	    	$scope.register_processing = false;
	    	if (err){
	    		console.log("error occurred while creating user");
	    	}else{
	    		$scope.new_user = {}; // this clears out the input fields
	    		$scope.registered = true;
	    	}
	    });

    };

    $scope.login = function() {
        // local storage
    	localStorageService.set('local_user', $scope.user_input);
    	UserFactory.login($scope.user_input,function(data) {
    		// console.log("factory data",data);
    		$scope.login = data;
    		$scope.user_input = {};
    	});
    };

    $scope.request_password = function() {
    	$scope.user_input = localStorageService.get('local_user');
        var email = $scope.user_input.email;

        UserFactory.requestPassword(email, function(output){
        	$window.location.href = output;
        });
    }
});



// #########################
// Login Controller
// #########################
limsApp.controller('LoginController', function($scope, $window, $routeParams) {
	$scope.admin = function() {
		var login = prompt("Please enter the password");
		if(login === "hooray") {
			console.log("login successful");
			$window.location.href = '/static/admin.html';
		} else {
			console.log("login terminated");
		}
	};
});

//#########################
//Reset Controller
//#########################
limsApp.controller('ResetController', function($scope, $location, $window, UserFactory) {
	$scope.reset = function() {
		UserFactory.resetPassword(user, $scope.user_input.password, function(output){
        	//$window.location.href = output;
			alert(output);
			$window.location.href = "../index.html";
        });
	};
});


// #########################
// LogOut Controller
// #########################
limsApp.controller('LogOutController', function($scope, $window, $routeParams, $http) {
	$scope.logout = function() {
		$http.get('/logout').success(function(output) {
			$window.location.href = output;
		});
	};
});

