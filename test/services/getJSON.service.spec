describe('GetJSON', function () {

  var service;

  beforeEach(function () {
    module('frontcamp16.components');
    inject(function ($injector) {
      service = $injector.get('$service')('GetJSON', { getPosts: getPosts });
    });
  });

  describe('.getPosts', function () {
    beforeEach(function () {
      spyOn(window, 'fetch').and.callThrough();
      GetJSON.getPosts();    
    });

    it('fetches from the JSON API', function () {
      expect(window.fetch).toHaveBeenCalledWith('http://localhost:8000/blog/json');
    });
  });


})




