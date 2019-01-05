var app = angular.module('app', [
    'ngRoute',
    'mainController'
]);

app.config(['$routeProvider', function  ($routeProvider) {
    $routeProvider.
    when('/dashboard', {
        templateUrl: 'sys/views/dashboard/index.html',
        controller: 'DashboardController'
    }).
    when('/users', {
        templateUrl: 'sys/views/users/index.html',
        controller: 'UserController'
    }).
    when('/projects', {
        templateUrl: 'sys/views/projects/index.html',
        controller: 'ProjectController'
    }).
    when('/:id/tasks', {
        templateUrl: 'sys/views/tasks/index.html',
        controller: 'TaskController'
    }).
    otherwise({
        redirectTo: '/dashboard'
    });
}]);

