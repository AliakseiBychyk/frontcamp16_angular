describe('BlogController', function () {
  var $rootScope;
  var $scope;
  var controller;
  var $q;
  var deferred;
  var GetJSON;

  beforeEach(function () {
    module('frontcamp16.components');
    inject(function ($injector) {
      $rootScope = $injector.get('$rootScope');
      $scope = $rootScope.$new();
      GetJSON = $injector.get('GetJSON');
      $q = $injector.get('$q');
      deferred = $q.defer();

      spyOn(GetJSON, 'getPosts').and.returnValue(deferred.promise);
      controller = $injector.get('$controller')('BlogController', { $scope: $scope, GetJSON: GetJSON });
    });
  });

  it("Should resolve promise", function () {
    deferred.resolve();
    $scope.$apply();
    expect($scope.posts).not.toBe(undefined);
    expect($scope.error).toBe(undefined);
  });
  
  it("Should reject promise", function () {
    deferred.reject();
    $scope.$apply();
    expect($scope.posts).toBe(undefined);
    expect($scope.error).toBe("There has been an error!");
  })

});