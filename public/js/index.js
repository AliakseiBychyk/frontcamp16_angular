import controllers from './controllers';
import directives from './directives';
import services from './services';
import _ from 'underscore';

const components = angular.module('frontcamp16.components', ['ng']);

_.each(controllers, (controller, name) => {
  componets.controller(name, controller);
});

_.each(directives, (directive, name) => {
  components.directive(name, directive);
});

_.each(services, (factory, name) => {
  components.factory(name, factory);
});

const app = angular.module('frontcamp16', ['frontcamp16.components', 'ngRoute']);

app.config(($routeProvider) => {
  $routeProvider.
    when('/', {
      templateUrl: 'main.html',
      controller: 'mainController'
    }).
    when('/login', {
      templateUrl: 'login.html',
      controller: 'authController'
    }).
    when('/register', {
      templateUrl: 'register.html',
      controller: 'authController'
    }).
    when('/blog', {
      templateUrl: 'blog.html',
      controller: 'blogController'
    }).
    when('/newpost', {
      templateUrl: 'newpost.html',
      controller: 'postController'
    }).;
});