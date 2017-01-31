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

exports.PostsController = ($scope) => {

    $scope.load = () => {
        fetch('http://localhost:8000/blog/json')
            .then(response => response.json())
            .then((data) => {
                $scope.posts = data.posts;
                $scope.posts.forEach(post => console.log(post.title));
            })
            .catch((err) => {
                console.log(err);
            })
    }

    $scope.load();

    setTimeout(() => {
       // $scope.load();
        $scope.$emit('PostsController');
    }, 0);
    
};