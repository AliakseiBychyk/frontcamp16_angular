exports.MainController = ($scope) => {
    $scope.title = 'Angular + Webpack';
    $scope.greetings = 'Aleks\'s Blog';
};

exports.AuthController = ($scope) => {
    $scope.title = 'Authentification';
};

exports.NewPostController = ($scope) => {
    $scope.title = 'Add new Post';
};

exports.BlogController = ($scope) => {
    $scope.title = 'Aleks\'s Blog';
};

exports.PostsController = ($scope, GetJSON) => {
    GetJSON.getPosts()
        .then(posts => {
            posts.forEach(post => console.log(post.title));
            return $scope.posts = posts;
        })
        .catch(err => console.log(err));
};