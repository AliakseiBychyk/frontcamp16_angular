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
    const promise = GetJSON.getPosts();
    promise
        .then(data => {
            data.posts.forEach(post => console.log(post.title));
            $scope.posts = data.posts;
        })
        .catch(err => console.log(err));
};