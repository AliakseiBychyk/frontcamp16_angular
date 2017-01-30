exports.mainController = ($scope) => {
  $scope.title = 'Angular + Webpack';
  $scope.greetings = 'Aleks\'s Blog';
};

exports.authController = ($scope) => {
  $scope.title = 'Authentification';
};

exports.postController = ($scope) => {
  $scope.title = 'Add new Post';
};

exports.blogController = ($scope) => {
  $scope.title = 'Aleks\'s Blog';
};

exports.PostsController = ($scope) => { 

  $scope.posts = fetch('http://localhost:8000/blog/json')
    .then(response => response.json())
    .then((data) => {
      $scope.posts = data.posts;
      $scope.posts.forEach(post => console.log(post.title));
    })
    .catch((err) => {
      console.log(err);
    });

};
