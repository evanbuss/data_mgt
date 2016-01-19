var limsApp = angular.module('limsApp', ['LocalStorageModule','ngRoute']);
// Config method for single page routing
	limsApp.config(function ($routeProvider) {
		$routeProvider
			.when('/',{
				templateUrl: './partials/home.html'
	        })
	        .when('/plots',{
				templateUrl: './partials/plots.html'
	        })
	        .otherwise({
	        	redirectTo: '/'
	        });
	});
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

// ---------------------------
// Tables Factory
// ---------------------------
limsApp.factory('TablesFactory', function($http, $window) {
	var factory = {};
	var formated = [];
	var originals = [];
	factory.getFormatedPcr = function(callback) {
		$http.get('/tables').success(function(output) {
	        formated = output;
	        // console.log('TableFactory getFormated() gave', output);
	        callback(output);
		});
    };
	factory.getOriginalPcr = function(callback) {
		$http.get('/original').success(function(output) {
	        originals = output;
	        // console.log('TableFactory getOrginal() gave', output);
	        callback(output);
		});
    };
    factory.getFormatedNegCulture = function(callback) {
		$http.get('/tablesNeg').success(function(output) {
	        formated = output;
	        // console.log('TableFactory getFormated() gave', output);
	        callback(output);
		});
    }
    factory.getOriginalNegCulture = function(callback) {
    	$http.get('/originalNeg').success(function(output) {
	        originals = output;
	        // console.log('TableFactory getOrginal() gave', output);
	        callback(output);
		});
    }

	return factory;
});


// ---------------------------
// Category Factory
// ---------------------------
limsApp.factory('CategoryFactory', function($http) {
	var factory = {};
	var categories = [];
	factory.getCategories = function(callback) {
		$http.get('/categories').success(function(output) {
			categories = output;
			callback(categories);
		});
	};

    return factory;
});

// ---------------------------
// Look-Up Factory
// ---------------------------
limsApp.factory('LookUpFactory', function($http) {
	var factory = {};
	var lookUps = [];
	var roberts = [];
	factory.getLookUps = function(callback) {
		$http.get('/lookUp').success(function(output) {
			lookUps = output;
			callback(lookUps);
		});
	};
	factory.getRobertLookUps = function(callback) {
		$http.get('/robertLookUp').success(function(output) {
			roberts = output;
			callback(roberts);
		});
	};

    return factory;
});


// ---------------------------
// Plotting Factory
// ---------------------------
limsApp.factory('PlottingFactory', function($http) {
	var factory = {};
	var plot_PosNeg = [];
	var plot_Org = [];
	factory.getPosNegs = function(callback) {
		$http.get('/plot_PosNeg').success(function(output) {
			plot_PosNeg = output;
			callback(plot_PosNeg);
		});
	};
	factory.getOrganisms = function(callback) {
		$http.get('/plot_Org').success(function(output) {
			plot_Org = output;
			callback(plot_Org);
		});
	};
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
	 }, 3000);

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
// Reset Controller
// #########################
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

// #########################
// Look Up Controller
// #########################
limsApp.controller('LookUpController', function($scope, $window, $routeParams, $http, LookUpFactory) {
	// Get Data
	LookUpFactory.getLookUps(function(data) {
		$scope.lookUps = data;
		$scope.lookUpColumns = columnNames(data);
	});
	LookUpFactory.getRobertLookUps(function(data) {
		$scope.robertLookUps = data;
		$scope.robertLookUpColumns = columnNames(data);
	});
	var columnNames = function(dat) {
		var columns = Object.keys(dat[0]).filter(function(key) {
		  if (dat[0].hasOwnProperty(key) && typeof key == 'string') {
		    return key;
		  }
		});
		return columns;
	};
});



// #########################
// Tables Controller
// #########################
limsApp.controller('TablesController', function($scope, $location, $window, TablesFactory, CategoryFactory, localStorageService) {

	//~~~~~~~~~~~~~~~~//
	// initilize data
	//~~~~~~~~~~~~~~~~//
	$scope.table_id = 1;

	TablesFactory.getFormatedPcr(function(data) {
		$scope.formatedPcr = data;
		var columns = columnNames(data);
		$scope.columns1 = columns.splice(3,columns.length);
	});
	TablesFactory.getOriginalPcr(function(data) {
		$scope.originalPcr = data;
		var columns = columnNames(data);
		$scope.columns2 = columns.splice(3,columns.length);
	});
	TablesFactory.getOriginalNegCulture(function(data) {
		// console.log("orginial tables", table)
		$scope.originalNegCulture = data;
		var columns = columnNames(data);
		$scope.columns4 = columns.splice(3,columns.length);
	});
	TablesFactory.getFormatedNegCulture(function(data) {
		$scope.formatedNegCulture = data;
		var columns = columnNames(data);
		$scope.columns3 = columns.splice(3,columns.length);
	});

	CategoryFactory.getCategories(function(data) {
		$scope.categories = data;
		$scope.current_category = data[0];
		localStorageService.set('current', $scope.current_category);
	});

	//~~~~~~~~~~~~~~~~~~~~~//
	//-- Scope Functions --//
	//~~~~~~~~~~~~~~~~~~~~~//
	$scope.changeTable = function(index) {
		// console.log("table_id", (index +1));
		var id = index+1;
		for(var i=0; i<$scope.categories.length; i++) {
			if($scope.categories[i].id === id) {
				$scope.current_category = $scope.categories[i];
				localStorageService.set('current', $scope.current_category);
			}
		}
		switch(id) {
			case 1: console.log("Formatted PCR Results");
					showFormPCR();
					break;
			case 2: console.log("Formatted Negitive Culture");
					showFormNegCulture();
					break;
			case 3: console.log("Heng's Original PCR Results");
					showOrgPCR();
					break;
			case 4: console.log("Original Negitive Culture");
					showOrgNegCulture();
					break;
			case 5: console.log("BAL PCR Results");
					showBalPCR();
					break;
			case 6: console.log("Formatted Culture Results");
					showFormatCulture();
					break;
			default:console.log("defualt, show Formatted PCR");
					showFormPCR();
		}
	}

	$scope.formated = function() {
		var choice = $scope.current_category.category_id;
		if(choice == 1) {
			showFormPCR();
		} else {
			showFormNegCulture();
		}
	}

	$scope.original = function() {
		var choice = $scope.current_category.category_id;
		if(choice == 1) {
			showOrgPCR();
		} else {
			showOrgNegCulture();
		}
	}

	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
	//--- Table Controller Functions ---//
	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
	var columnNames = function(dat) {
		var columns = Object.keys(dat[0]).filter(function(key) {
		  if (dat[0].hasOwnProperty(key) && typeof key == 'string') {
		    return key;
		  }
		});
		return columns;
	};

	var showFormNegCulture = function() {
		$('#format-pcr-wrapper').css("display","none");
		$('#original-pcr-wrapper').css("display","none");
		$('#orginal-neg-wrapper').css("display", "none");
		$('#formated-neg-wrapper').css("display","block");
		for(var i=0; i<$scope.categories.length; i++) {
			if($scope.categories[i].table_name == "Formatted Negitive Culture") {
				$scope.current_category = $scope.categories[i];
			}
		}
	};

	var showOrgNegCulture = function() {
		$('#format-pcr-wrapper').css("display","none");
		$('#original-pcr-wrapper').css("display","none");
		$('#formated-neg-wrapper').css("display","none");
		$('#orginal-neg-wrapper').css("display", "block");
		for(var i=0; i<$scope.categories.length; i++) {
			if($scope.categories[i].table_name == "Heng's Original Culture Results") {
				$scope.current_category = $scope.categories[i];
			}
		}
	};

	var showFormPCR = function() {
		$('#format-pcr-wrapper').css("display","block");
		$('#original-pcr-wrapper').css("display","none");
		$('#formated-neg-wrapper').css("display","none");
		$('#orginal-neg-wrapper').css("display", "none");
		for(var i=0; i<$scope.categories.length; i++) {
			if($scope.categories[i].table_name == "Formatted PCR Results") {
				$scope.current_category = $scope.categories[i];
			}
		}
	};

	var showOrgPCR = function() {
		$('#format-pcr-wrapper').css("display","none");
		$('#original-pcr-wrapper').css("display","block");
		$('#formated-neg-wrapper').css("display","none");
		$('#orginal-neg-wrapper').css("display", "none");
		for(var i=0; i<$scope.categories.length; i++) {
			if($scope.categories[i].table_name == "Heng's Original PCR Results") {
				$scope.current_category = $scope.categories[i];
			}
		}
	};

	var showBalPCR = function() {
		$('#format-pcr-wrapper').css("display","block");
		$('#original-pcr-wrapper').css("display","none");
		$('#formated-neg-wrapper').css("display","none");
		$('#orginal-neg-wrapper').css("display", "none");
		for(var i=0; i<$scope.categories.length; i++) {
			if($scope.categories[i].table_name == "BAL PCR Results") {
				$scope.current_category = $scope.categories[i];
			}
		}
	};

	var showFormatCulture = function() {
		$('#format-pcr-wrapper').css("display","none");
		$('#original-pcr-wrapper').css("display","none");
		$('#orginal-neg-wrapper').css("display", "none");
		$('#formated-neg-wrapper').css("display","block");
		for(var i=0; i<$scope.categories.length; i++) {
			if($scope.categories[i].table_name == "Formatted Culture Results") {
				$scope.current_category = $scope.categories[i];
			}
		}
	};



});

// #########################
// Plotting Controller
// #########################
limsApp.controller('PlottingController', function($scope, $window, $routeParams, $http, PlottingFactory, localStorageService) {
	var current_category = localStorageService.get('current');
	var current_table_id = current_category.id;
	$scope.current_category = current_category;
	// console.log("current", $scope.current_category);
	// console.log("table id", current_table_id);

	// Get Plotting Data
	PlottingFactory.getPosNegs(function(data) {
		$scope.PosNegs = data;

		for(var i=0; i<$scope.PosNegs.length; i++) {
			if($scope.PosNegs[i].unique_id == current_table_id) {
				$scope.currentPlot = $scope.PosNegs[i];
			}
		}
		// console.log("$scope.currentPlot", $scope.currentPlot);
		setTimeout(function() {
			console.log("fire");
			highcharts();
		}, 300)
	});
	PlottingFactory.getOrganisms(function(data) {
		$scope.Organisms = data;
		// console.log("organisims data", data);
	});


	//~~ HighCharts ~~//
	var highcharts = function() {
	/** MonoChrome Pie Chart **/
		$(function () {
		    // Build the chart
		    $('#pie').highcharts({
		        chart: {
		            plotBackgroundColor: null,
		            plotBorderWidth: null,
		            plotShadow: false,
		            type: 'pie'
		        },
		        title: {
		            text: 'Test Results'
		        },
		        subtitle: {
		            text: current_category.table_name
		        },
		        tooltip: {
		            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
		        },
		        plotOptions: {
		            pie: {
		                allowPointSelect: true,
		                cursor: 'pointer',
		                dataLabels: {
		                    enabled: true,
		                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
		                    style: {
		                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
		                    }
		                }
		            }
		        },
		        series: [{
		            name: 'User Name',
		            data: [
		                { name: 'Negitive', y: 206},
		                { name: 'Positive', y: 35}
		            ]
		        }]
		    });
		});
	/** 3D Donut **/
		$(function () {
			// Build the chart
		    $('#donut').highcharts({
		        chart: {
		            type: 'pie',
		            options3d: {
		                enabled: true,
		                alpha: 45
		            }
		        },
		        title: {
		            text: 'Organims detected'
		        },
		        subtitle: {
		            text: current_category.ta
		        },
		        plotOptions: {
		            pie: {
		                innerSize: 100,
		                depth: 45
		            }
		        },
		        series: [{
		            name: 'Organims',
		            data: [
		                ['Adeno B/E', 168 ],
						['Adenovirus', 32 ],
						['Bordetella parapertussis', 10 ],
						['Bordetella pertussis', 1 ],
						['Chlamydia pneumoniae', 1 ],
						['Fungal', 4 ],
						['Influenza A', 6 ],
						['Legionella', 4 ],
						['Mycoplasma pneumoniae', 2 ],
						['Parainfluenza 1', 4 ],
						['Pnuemocystis jirovecii', 9 ]
		            ]
		        }]
		    });
		});
	}


});



