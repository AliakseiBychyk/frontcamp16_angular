import angular from 'angular';
import ngRoute from 'angular-route';
import _ from 'underscore';
import directives from './directives';
import controllers from './controllers';
import services from './services';

const components = angular.module('frontcamp16.components', ['ng']);

_.each(controllers, (controller, name) => {
    components.controller(name, controller);
})

_.each(directives, (directive, name) => {
    components.directive(name, directive);
});

_.each(services, (factory, name) => {
    components.factory(name, factory);
});

const app = angular.module('frontcamp16', ['frontcamp16.components', 'ngRoute']);

app.config(($routeProvider) => {
    $routeProvider
        .when('/', {
            templateUrl: 'templates/home.html',
            controller: 'MainController'
        })
        .when('/login', {
            templateUrl: 'templates/login.html',
            controller: 'AuthController'
        })
        .when('/register', {
            templateUrl: 'templates/register.html',
            controller: 'AuthController'
        })
        .when('/blog', {
            templateUrl: 'templates/blog.html',
            controller: 'PostsController'
        })
        .when('/newpost', {
            templateUrl: 'templates/newpost.html',
            controller: 'NewPostController'
        });
});