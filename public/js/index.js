import angular from 'angular';
import ngRoute from 'angular-route';
import _ from 'underscore';
import directives from './directives';
import controllers from './controllers';

const components = angular.module('frontcamp16.components', ['ng']);

_.each(controllers, (controller, name) => {
    components.controller(name, controller);
    console.log(name); // => authController
    console.log(controller); // => function ($scope) {$scope.title = 'Authentification';}
})

_.each(directives, (directive, name) => {
    components.directive(name, directive);
    console.log(name);
    console.log(directive);
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

app.factory('GetJSON', () => {
    return {
        getPosts: () => {
            return fetch('http://localhost:8000/blog/json')
                .then(response => response.json())
                .then( data => {
                    resolve(data.posts);
                })
                .catch((err) => console.log(err));
        }
    }
})