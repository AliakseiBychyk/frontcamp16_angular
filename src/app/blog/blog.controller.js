exports.BlogController = ($scope, GetJSON) => {
    'ngInject';
    const promise = GetJSON.getPosts();
    promise
        .then(data => {
            data.posts.forEach(post => console.log(post.title));
            $scope.posts = data.posts;
        })
        .catch(err => console.log(err));


    $scope.newPost = { 
        title: '',
        body: '',
        permalink: '',
        author: '',
        tags: [],
        date: ''
    };

    $scope.writePost = () => {
        $scope.newPost.date = Date.now();
        $scope.posts.push($scope.newPost);
        $scope.newPost = {
            title: '',
            body: '',
            permalink: '',
            author: '',
            tags: [],
            date: ''
        };
    };    
};
