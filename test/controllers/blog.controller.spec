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
  


// describe('.getPosts', function() {
//   var apiPromise; 
//   var promiseHelper;

//   beforeEach(function() {
//     var fetchPromise = new Promise(function(resolve, reject) {
//       promiseHelper = {
//         resolve: resolve,
//         reject: reject
//       };
//     });
//     spyOn(window, 'fetch').and.returnValue(fetchPromise);
//     apiPromise = GetJSON.getPosts();
//   });

//   it('fetches from the blog API', function() {
//     expect(window.fetch).toHaveBeenCalledWith('http://localhost:8000/blog/json');
//   });

//   it('returns a promise', function() {
//     expect(apiPromise).toEqual(jasmine.any(Promise));
//   });

//   describe('on successful fetch', function() {
//     beforeEach(function() {
//       var response = new Response(/*JSON.stringify({
//         temperature: 78
//       })*/);
//       promiseHelper.resolve(response);
//     });

//     // it('resolves its promise with the current temperature', function(done) {
//     //   apiPromise.then(function(temperature) {
//     //     expect(temperature).toEqual(78);
//     //     done();
//     //   });
//     // });
//   });

//   describe('on unsuccessful fetch', function() {
//     var errorObj = { msg: 'Wow, this really failed!' };

//     beforeEach(function() {
//       promiseHelper.reject(errorObj);
//     });

//     it('resolves its promise with the current temperature', function(done) {
//       temperaturePromise.catch(function(error) {
//         expect(error).toEqual(errorObj);
//         done();
//       });
//     });
//   });
// });

 
});