exports.homePage = () => {
  return {
    controller: 'mainController',
    templateUrl: 'templates/home.html'
  };
}


exports.posts = () => {
  return {
    controller: 'PostsController',
    templateUrl: 'templates/blog.html'
  }
}  

