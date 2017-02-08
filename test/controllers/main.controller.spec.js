describe('MainController', function () {
  var $rootScope;
  var $scope;
  var controller;

  beforeEach(function () {
    module('frontcamp16.components');
    inject(function ($injector) {
      $rootScope = $injector.get('$rootScope');
      $scope = $rootScope.$new();
      controller = $injector.get('$controller')('MainController', { $scope: $scope });
    });
  });

  describe('Title', function () {
    it("Should have a title", function () {
      expect($scope.title).toEqual("Angular + Webpack");
    });
  });

  describe('Greetings', function () {
    it("Should have a greetings", function () {
      expect($scope.greetings).toEqual("Aleks\'s Blog");   
    });
  });

});