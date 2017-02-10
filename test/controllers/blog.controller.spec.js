describe('BlogController', function () {
  var $rootScope;
  var $scope;
  var controller;
  var GetJSON;
  var getJSONSpy;
  var $q;
  var deferred;


  beforeEach(function () {
    module('frontcamp16.components');
    inject(function ($injector) {
      $rootScope = $injector.get('$rootScope');
      $scope = $rootScope.$new();
      GetJSON = $injector.get('GetJSON');
      $q = $injector.get('$q');
      deferred = $q.defer();
      getJSONSpy = spyOn(GetJSON, 'getPosts').and.returnValue(deferred.promise);
      controller = $injector.get('$controller')('BlogController', { $scope: $scope, GetJSON: GetJSON });
    });
  });
  
  describe("Action Handlers", function () {
    it("Should call the GetJSON.getPosts method and resolve promise", function () {
      deferred.resolve({ posts: [{ title: 'Test Post One' }] });
      $scope.$apply();
      expect(getJSONSpy).toHaveBeenCalledWith();
      expect($scope.posts).not.toBe(undefined);
      expect($scope.error).toBe(undefined);
    });
  });
});