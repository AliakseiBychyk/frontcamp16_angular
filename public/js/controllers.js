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

// exports.PostsController = ($scope, DataPosts) => {
//     $scope.posts = DataPosts.getPosts();
//     console.log($scope.posts);
//     $scope.posts.forEach(post => console.log(post.title));
// };

exports.PostsController = ($scope, model) => {

    $scope.posts = model;

    console.log(model);
    $scope.posts.forEach(post => console.log(post.title));

};