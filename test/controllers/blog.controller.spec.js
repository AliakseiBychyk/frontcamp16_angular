describe('BlogController', function () {
  var $rootScope;
  var $scope;
  var controller;
  var GetJSON;
  var getJSONSpy;


  beforeEach(function () {
    module('frontcamp16.components');
    inject(function ($injector) {
      $rootScope = $injector.get('$rootScope');
      $scope = $rootScope.$new();
      GetJSON = $injector.get('GetJSON');
      getJSONSpy = spyOnAngularService($injector.get('GetJSON'), 'getPosts', jsonFromApi);
      controller = $injector.get('$controller')('BlogController', { $scope: $scope });
    });
  });

  describe("Action Handlers", function () {
    it("Should call the GetJSON.getPosts method", function () {
      $scope.setBlog();
      expect(getJSONSpy).toHaveBeenCalledWith();
    });
  });

// describe('.getPosts', function() {
//     beforeEach(function() {
//         spyOn(window, 'fetch').and.callThrough();
//         GetJSON.getPosts();
//     });

//     it('fetches from the blog API', function () {
//       expect(window.fetch).toHaveBeenCalledWith('http://localhost:8000/blog/json');
//     });
// });



      // it('Should return the number of post equals 20', function () {
      //   //GetJSON.getPosts();
      //   console.log($scope);
      //   $scope.$setBlog();
      //   expect($scope.counter).toEqual(20);
      // });


    // afterEach(function () {
    
    // });

    // after

 
});