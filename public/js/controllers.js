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
 
  const getPosts = (callback) => {
    fetch('http://localhost:8000/blog/json')
      .then(response => response.json())
      .then((data) => {
        callback(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getPosts( data => {
    $scope.posts = data.posts
    $scope.posts.forEach(post => console.log(post.title));
  }); 
  
  
  // $scope.posts = getPosts(data => data.posts);
  // $scope.posts.forEach(post => console.log(post.title));
 
};


// exports.PostsController = funcion($scope, $http)
