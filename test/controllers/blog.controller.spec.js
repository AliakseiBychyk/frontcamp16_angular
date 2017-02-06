describe('BlogController', function () {
  var $rootScope;
  var $scope;
  var controller;
  var GetJSON;

  beforeEach(function () {
    module('frontcamp16.components');
    inject(function ($injector) {
      $rootScope = $injector.get('$rootScope');
      $scope = $rootScope.$new();
      controller = $injector.get('$controller')('BlogController', { $scope: $scope, GetJSON: GetJSON });
    });
  });

  describe('Get the posts number', function () {
    it('Should return the number of post equals 20', function () {      
      expect($scope.counter).toEqual(20);
    });
  });


})