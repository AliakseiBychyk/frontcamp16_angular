import angular from 'angular';
import ngRoute from 'angular-route';
import _ from 'underscore';
import controllers from './controllers';

const components = angular.module('frontcamp16.components', ['ng']);

_.each(controllers, (controller, name) => {
  components.controller(name, controller);
  console.log(name);
  console.log(controller);
})

const app = angular.module('frontcamp16', ['frontcamp16.components', ngRoute]);

console.log(ngRoute);
console.log(app);

app.config(($routeProvider) => {
  $routeProvider.
    when('/', {
      template: '<h1>Home Page</h1><a ng-href="#/login">Login</a>',
      controller: 'mainController'
    }).
    when('/login', {
      template: '<a ng-href="#/">Back to home page</a>',
      controller: 'authController'
    }).
    when('/register', {
      templateUrl: 'index.html',
      controller: 'authController'
    }).
    when('/blog', {
      templateUrl: 'index.html',
      controller: 'blogController'
    }).
    when('/newpost', {
      templateUrl: 'index.html',
      controller: 'postController'
    });
});