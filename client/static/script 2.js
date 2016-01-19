var limsApp = angular.module('limsApp', ['LocalStorageModule','ngRoute']);
// Config method for single page routing
	limsApp.config(function ($routeProvider) {
		$routeProvider
			.when('/',{
				templateUrl: './static/partials/home.html'
	        })
	        .when('/profile',{
				templateUrl: './static/partials/profile.html'
	        })
	        .when('/projectManager',{
				templateUrl: './static/partials/projectManager.html'
	        })
	        .when('/labView',{
				templateUrl: './static/partials/labView.html'
	        })
	        .when('/samples',{
				templateUrl: './static/partials/samples.html'
	        })
	        .when('/configure',{
				templateUrl: './static/partials/configure.html'
	        })
	        .otherwise({
	        	redirectTo: '/'
	        });
	});

limsApp.controller('ChartCtrl', function ($scope, $timeout) {

	var apple ="apple";

	$(function () {

	    // Make monochrome colors and set them as default for all pies
	    Highcharts.getOptions().plotOptions.pie.colors = (function () {
	        var colors = [],
	            base = Highcharts.getOptions().colors[0],
	            i;

	        for (i = 0; i < 10; i += 1) {
	            // Start out with a darkened base color (negative brighten), and end
	            // up with a much brighter color
	            colors.push(Highcharts.Color(base).brighten((i - 3) / 7).get());
	        }
	        return colors;
	    }());

	    // Build the chart
	    $('#container').highcharts({
	        chart: {
	            plotBackgroundColor: null,
	            plotBorderWidth: null,
	            plotShadow: false,
	            type: 'pie'
	        },
	        title: {
	            text: 'Browser market shares at a specific website, 2014'
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
	            name: 'Brands',
	            data: [
	                { name: 'Microsoft Internet Explorer', y: 56.33 },
	                { name: 'Chrome', y: 24.03 },
	                { name: 'Firefox', y: 10.38 },
	                { name: 'Safari', y: 4.77 },
	                { name: 'Opera', y: 0.91 },
	                { name: 'Proprietary or Undetectable', y: 0.2 }
	            ]
	        }]
	    });
	});


});