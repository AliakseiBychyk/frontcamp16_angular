describe('Blog', () => {
  const injector;
  const element;
  const scope;
  const intercepts;
  const httpBackend;
  let succeeded = 0;

  beforeEach(() = {
    injector = angular.injector(['frontcamp16.components', 'ngMockE2E']);
    intercepts = {};

    injector.invoke(($rootScope, $compile, $httpBackend) => {
      scope = $rootScope.$new();

      $httpBackend.whenGET(/\.html$/).passThrough();
      httpBackend = $httpBackend;

      element = $compile('<div ></div>')(scope);
      scope.$apply();
    })
  })  




})