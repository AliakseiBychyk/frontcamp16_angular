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

// exports.PostsController = ($scope, DataPosts) => {
//     $scope.posts = DataPosts.getPosts();
//     console.log($scope.posts);
//     $scope.posts.forEach(post => console.log(post.title));
// };

// exports.PostsController = ($scope) => {
//     function getData() {
//         fetch('http://localhost:8000/blog/json')
//             .then(response => response.json())
//             .then((data) => {
//                 data.posts.forEach(post => console.log(post.title));
//                 updateScope(data);
//             })
//             .catch((err) => {
//                 console.log(err);
//             })
//     }

//     function updateScope(method) {
//         $scope.method = method;
//     }
    
//     getData();
//     console.log($scope);
// };

// exports.PostsController = ($scope) => {

//     $scope.data = (() => {
//         fetch('http://localhost:8000/blog/json')
//             .then(response => response.json())
//             .then((data) => {
//                 getPosts(data);
//                 getPosts(data).posts.forEach(post => console.log(post.title));
//             })
//             .catch((err) => {
//                 console.log(err);
//             })
//     })();

//     const getPosts = json => json;

//     console.log($scope.data);

// };


// exports.PostsController = ($scope, $http) => {
//   $http.get('http://localhost:8000/blog/json')
//     .success((data) => {
//       $scope.posts = data;
//     })
//     .error((err) => console.log(err));
// });

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