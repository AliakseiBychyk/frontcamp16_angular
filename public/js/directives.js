exports.homePage = () => {
  return {
    controller: 'mainController',
    templateUrl: 'templates/home.html'
  };
}


exports.posts = () => {
  return {
    controller: 'MyHTTPController',
    templateUrl: 'templates/blog.html'
  }
}  

