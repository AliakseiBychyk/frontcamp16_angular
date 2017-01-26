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
      templateUrl: 'templates/home.html',
      controller: 'mainController'
    }).
    when('/login', {
      templateUrl: 'templates/login.html',
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