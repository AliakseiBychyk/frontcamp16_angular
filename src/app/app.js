import angular from 'angular';
import ngRoute from 'angular-route';
import _ from 'underscore';
// controllers
import MainController from './home/main.controller';
import AuthController from './authentification/auth.controller';
import BlogController from './blog/blog.controller';

// services
import GetJSON from './blog/getJSON.service.js';

// arrange components 
const controllers = [MainController, AuthController, BlogController];
const services = [GetJSON];
const directives = [];


// connect components to main module
const components = angular.module('frontcamp16.components', ['ng']);

controllers.forEach(controller => {
    _.each(controller, (controller, name) => {
        components.controller(name, controller);
    });
});

directives.forEach(directive => {
    _.each(directive, (directive, name) => {
        components.directive(name, directive);
    });
});    

services.forEach(service => {
    _.each(service, (factory, name) => {
        components.factory(name, factory);
    });
});

// main application module with routing
const app = angular.module('frontcamp16', ['frontcamp16.components', 'ngRoute']);

app.config(($routeProvider, $locationProvider) => {
    $routeProvider
        .when('/', {
            templateUrl: 'app/home/home.html',
            controller: 'MainController'
        })
        .when('/login', {
            templateUrl: 'app/authentification/login.html',
            controller: 'AuthController'
        })
        .when('/register', {
            templateUrl: 'app/authentification/register.html',
            controller: 'AuthController'
        })
        .when('/blog', {
            templateUrl: 'app/blog/blog.html',
            controller: 'BlogController'
        })
        .when('/newpost', {
            templateUrl: 'app/newpost/newPost.html',
            controller: 'BlogController'
        });
    
    $locationProvider.html5Mode(false); // there is no need to use HTML5 history API
    $locationProvider.hashPrefix('');
});