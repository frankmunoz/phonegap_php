/* global angular,window */

var pmaEmergencia = angular.module('pmaEmergencia', [
	'ngRoute',
	'pmaEmergenciaControllers',
	'pmaEmergenciaServices',
	'pmaEmergenciaFilters'
	,'ngSanitize', 'ui.select'
]);

pmaEmergencia.config(
function($routeProvider,$httpProvider) {
	$routeProvider.
	when('/home', {
		templateUrl: 'partials/home.html',
		controller: 'HomeCtrl',
		title: 'Beneficiarios'
	}).
	when('/edit', {
		templateUrl: 'partials/edit.html',
		controller: 'EditCtrl'
	}).
	when('/edit/:key', {
		templateUrl: 'partials/edit.html',
		controller: 'EditCtrl'
	}).
	when('/sync', {
		templateUrl: 'partials/sync.html',
		controller: 'SyncCtrl'
	}).
	when('/about', {
		templateUrl: 'partials/about.html'
	}).
	when('/unsupported', {
		templateUrl: 'partials/unsupported.html'
	}).
	otherwise({
		redirectTo: '/home'
	});


	//$httpProvider.interceptors.push('LoadingInterceptor');

	/*
	$httpProvider.interceptors.push(function($rootScope) {
	            return {
	                request: function(config) {

	                        $rootScope.$broadcast('loading:show');
	                        return config;

	                },
	                response: function(response) {
	                    $rootScope.$broadcast('loading:hide');
	                    return response;
	                },
	                responseError: function(rejection) {
	                    $rootScope.$broadcast('loading:hide');
	                    return rejection;
	                }
	            }
	        })	*/
})/*.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('LoadingInterceptor');
}])*/.run(['$rootScope','$location','persistanceService', function($rootScope,$location,persistanceService) {


	$rootScope.$on("$routeChangeStart", function(event,currentRoute, previousRoute){
		if(!persistanceService.ready() && ($location.path() != '/home' && $location.path() != '/unsupported')) {
			$location.path('/home');
		};

	});

}]);




var interceptor2 = function ($q, $location) {
    return {
        request: function (config) {
            angular.element(document.body).addClass('loading1');
            console.log('111'+config);
            return config;
        },

        response: function (result) {
            angular.element(document.body).removeClass('loading1');
            console.log('Repos1:', result);
            return result;
        },

        responseError: function (rejection) {
            angular.element(document.body).removeClass('loading1');
            console.log('Failed1 with1', rejection.status, 'status', rejection);
            if (rejection.status == 403) {
                $location.url('/login');
            }

            return $q.reject(rejection);
        }
    }
};
