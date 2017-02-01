import angular from 'angular';
import ngRoute from 'angular-route';
import _ from 'underscore';
// controllers
import MainController from './home/mainCtrl';
import AuthController from './authentification/authCtrl';
import BlogController from './blog/blogCtrl'
import NewPostController from './newpost/newPostCtrl';
// services
import GetJSON from './blog/getJSON.service.js';

// arrange components 
const controllers = [MainController, AuthController, BlogController, NewPostController];
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

app.config(($routeProvider) => {
    $routeProvider
        .when('/', {
            templateUrl: 'app/home/home.tpl.html',
            controller: 'MainController'
        })
        .when('/login', {
            templateUrl: 'app/authentification/login.tpl.html',
            controller: 'AuthController'
        })
        .when('/register', {
            templateUrl: 'app/authentification/register.tpl.html',
            controller: 'AuthController'
        })
        .when('/blog', {
            templateUrl: 'app/blog/blog.tpl.html',
            controller: 'BlogController'
        })
        .when('/newpost', {
            templateUrl: 'app/newpost/newPost.tpl.html',
            controller: 'NewPostController'
        });
});