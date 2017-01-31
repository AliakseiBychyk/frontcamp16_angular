exports.homePage = () => {
  return {
    controller: 'MainController',
    templateUrl: 'templates/home.html'
  };
}

exports.blog = () => {
  return {
    controller: 'PostsController',
    templateUrl: 'templates/blog.html'
  }
}  

exports.login = () => {
  return {
    controller: 'AuthController',
    templateUrl: 'templates/login.html'
  }
}  

exports.register = () => {
  return {
    controller: 'AuthController',
    templateUrl: 'templates/register.html'
  }
} 

exports.newpost = () => {
  return {
    controller: 'NewPostController',
    templateUrl: 'templates/newpost.html'
  }
}   